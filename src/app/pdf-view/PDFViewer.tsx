"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
// ⚠️ pdfjs-dist ને module સ્તરે import ન કરવું — તે DOMMatrix વાપરે છે,
// જે server પર હોતું નથી અને prerender તૂટે છે. નીચે effect માં dynamic import છે.
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { Maximize2, Minus, Plus, RefreshCw, TriangleAlert } from "lucide-react";
import { BackArrow } from "@/components/common/BackArrow";
import { Button } from "@/components/ui/Button";
import { AtomLoader } from "@/components/ui/AtomLoader";
import { toGujaratiDigits } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────
   સ્થિરાંક
   ────────────────────────────────────────────────────────────── */

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.2;
/** કાર્ડનું આડું padding — ફિટ ગણતરીમાં બાદ કરવું પડે */
const CARD_GUTTER = 16;

type Status = "loading" | "ready" | "error";

interface PageBox {
  width: number;
  height: number;
}

interface LoadedDoc {
  key: string;
  doc: PDFDocumentProxy;
  box: PageBox;
  numPages: number;
}

const clampScale = (value: number): number =>
  Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(value * 100) / 100));

/** ફક્ત `/pdfs/…` ની અંદરની ફાઇલ જ ખૂલે — બહારની URL બ્લોક */
function isSafePdfPath(value: string | null): value is string {
  if (!value) return false;
  if (!value.startsWith("/pdfs/")) return false;
  if (value.startsWith("//")) return false;
  if (value.includes("..")) return false;
  return true;
}

/* ──────────────────────────────────────────────────────────────
   ભૂલનું કાર્ડ
   ────────────────────────────────────────────────────────────── */

function ErrorCard({
  heading,
  message,
  onRetry,
}: {
  heading: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="card anim-fade-up mx-auto my-10 flex max-w-md flex-col items-center gap-3 p-7 text-center">
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full text-white"
        style={{ background: "var(--grad-brand)" }}
        aria-hidden="true"
      >
        <TriangleAlert size={26} strokeWidth={2.2} />
      </span>
      <h2 className="text-[1.05rem] font-extrabold text-[var(--fg)]">{heading}</h2>
      <p className="text-[0.88rem] leading-relaxed text-[var(--fg-muted)]">{message}</p>
      {onRetry ? (
        <Button variant="solid" size="sm" onClick={onRetry} className="mt-1">
          <RefreshCw size={15} strokeWidth={2.4} />
          ફરી પ્રયાસ કરો
        </Button>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   એક પાનું — પોતાનું canvas, પોતાનો render
   દરેક પાનું સ્વતંત્ર છે, તેથી એકનું teardown બીજાને રોકતું નથી.
   ────────────────────────────────────────────────────────────── */

function PdfPage({
  doc,
  pageNumber,
  scale,
  box,
}: {
  doc: PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  box: PageBox | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let task: RenderTask | null = null;

    void (async () => {
      const page = await doc.getPage(pageNumber);
      if (cancelled) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale });
      const cssWidth = Math.floor(viewport.width);
      const cssHeight = Math.floor(viewport.height);

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      task = page.render({
        canvas,
        viewport,
        transform: dpr === 1 ? undefined : [dpr, 0, 0, dpr, 0, 0],
      });

      // cancel થાય ત્યારે RenderingCancelledException આવે — એ અપેક્ષિત છે
      await task.promise.catch(() => undefined);
    })();

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, pageNumber, scale]);

  return (
    <div
      data-pdf-page={pageNumber}
      className="card anim-fade-up w-full overflow-x-auto p-1.5 sm:p-2"
      style={box ? { minHeight: Math.round(box.height * scale) } : undefined}
    >
      <canvas
        ref={canvasRef}
        className="mx-auto block rounded-[var(--r-md)]"
        aria-label={`પાનું ${toGujaratiDigits(pageNumber)}`}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   મુખ્ય viewer
   ────────────────────────────────────────────────────────────── */

export default function PDFViewer() {
  const searchParams = useSearchParams();
  const fileParam = searchParams.get("file");
  const titleParam = searchParams.get("title");

  const safeFile = isSafePdfPath(fileParam) ? fileParam : null;
  const title = titleParam?.trim() ? titleParam.trim() : "PDF";

  const [attempt, setAttempt] = useState(0);
  /** દરેક લોડ-પ્રયાસની અનન્ય ઓળખ — જૂનું પરિણામ આપોઆપ અવગણાય */
  const loadKey = `${safeFile ?? ""}#${attempt}`;

  const [loaded, setLoaded] = useState<LoadedDoc | null>(null);
  const [failedKey, setFailedKey] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);

  const shellRef = useRef<HTMLDivElement | null>(null);

  /* ── derived state — effect માંથી setState કરવાની જરૂર નથી ── */

  const ready = loaded && loaded.key === loadKey ? loaded : null;
  const status: Status = ready
    ? "ready"
    : failedKey === loadKey
      ? "error"
      : "loading";

  const doc = ready?.doc ?? null;
  const pageBox = ready?.box ?? null;
  const numPages = ready?.numPages ?? 0;

  /* ── પહોળાઈ પ્રમાણે ફિટ ─────────────────────────────────── */

  const fitScaleFor = useCallback((box: PageBox | null): number => {
    const shell = shellRef.current;
    if (!box || !shell || box.width <= 0) return 1;
    const available = shell.clientWidth - CARD_GUTTER;
    if (available <= 0) return 1;
    return clampScale(available / box.width);
  }, []);

  const handleFit = useCallback(() => {
    setScale(fitScaleFor(pageBox));
  }, [fitScaleFor, pageBox]);

  /* ── ૧. Document લોડ કરવું ──────────────────────────────── */

  useEffect(() => {
    if (!safeFile) return;

    let cancelled = false;
    let destroy: (() => void) | undefined;

    void (async () => {
      // pdfjs-dist ફક્ત client પર જ લોડ થાય — worker પણ અહીં જ સેટ થાય
      const pdfjsLib = await import("pdfjs-dist");
      if (cancelled) return;
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

      const task = pdfjsLib.getDocument({ url: safeFile });
      // StrictMode નું બીજું mount throw ન કરે એ માટે સાફ-સફાઈ:
      // loading task તથા તેનું document બંને destroy થાય
      destroy = () => void task.destroy();

      try {
        const pdf: PDFDocumentProxy = await task.promise;
        if (cancelled) return;
        const first = await pdf.getPage(1);
        if (cancelled) return;
        const viewport = first.getViewport({ scale: 1 });
        const box: PageBox = { width: viewport.width, height: viewport.height };

        setLoaded({ key: loadKey, doc: pdf, box, numPages: pdf.numPages });
        // નવું document ખૂલે એટલે આપોઆપ પહોળાઈ પ્રમાણે ફિટ
        setScale(fitScaleFor(box));
      } catch {
        if (!cancelled) setFailedKey(loadKey);
      }
    })();

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [safeFile, loadKey, fitScaleFor]);

  /* ── ૨. Scroll પરથી ચાલુ પાનું શોધવું ───────────────────── */

  useEffect(() => {
    if (status !== "ready" || numPages === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let best = 1;
      let bestDistance = Number.POSITIVE_INFINITY;

      document.querySelectorAll<HTMLElement>("[data-pdf-page]").forEach((el) => {
        const pageNo = Number(el.dataset.pdfPage);
        if (!pageNo) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - middle);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = pageNo;
        }
      });

      setCurrentPage(best);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    // પહેલી ગણતરી પણ rAF માં — effect body માંથી સીધું setState નહીં
    frame = window.requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [status, numPages]);

  /* ── રેન્ડર ──────────────────────────────────────────────── */

  const pageNumbers = useMemo(
    () => Array.from({ length: numPages }, (_, i) => i + 1),
    [numPages],
  );

  const zoomPercent = Math.round(scale * 100);
  const shownPage = Math.min(Math.max(currentPage, 1), Math.max(numPages, 1));
  const showToolbar = status === "ready" && numPages > 0;

  return (
    <main className="w-full px-3 pt-4 pb-28 sm:px-5 sm:pb-32">
      <div ref={shellRef} className="mx-auto w-full max-w-5xl">
        {/* ઉપરની હરોળ */}
        <div className="anim-fade-up mb-4 flex items-center justify-between gap-3">
          <BackArrow href="/subjects" label="પાછળ" />
          <h1
            className="min-w-0 flex-1 truncate text-end text-[0.9rem] font-extrabold text-[var(--fg)] sm:text-[1.08rem]"
            title={title}
          >
            {title}
          </h1>
        </div>

        {!safeFile ? (
          <ErrorCard
            heading="PDF ઉપલબ્ધ નથી"
            message="આ લિંક માન્ય નથી. કૃપા કરીને પ્રકરણની યાદીમાંથી ફરીથી PDF ખોલો."
          />
        ) : status === "error" ? (
          <ErrorCard
            heading="PDF ખોલી શકાયું નથી"
            message="ફાઇલ લોડ કરવામાં તકલીફ પડી. ઇન્ટરનેટ જોડાણ તપાસીને ફરી પ્રયાસ કરો."
            onRetry={() => setAttempt((n) => n + 1)}
          />
        ) : status === "loading" ? (
          <AtomLoader label="PDF લોડ થાય છે…" />
        ) : (
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            {doc
              ? pageNumbers.map((pageNo) => (
                  <PdfPage
                    key={pageNo}
                    doc={doc}
                    pageNumber={pageNo}
                    scale={scale}
                    box={pageBox}
                  />
                ))
              : null}
          </div>
        )}
      </div>

      {/* તરતો pill toolbar — desktop તથા compact mobile */}
      {showToolbar ? (
        <div
          className="glass fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 px-2 py-1.5 sm:bottom-6 sm:gap-2 sm:px-3 sm:py-2"
          style={{ borderRadius: "var(--r-pill)" }}
          role="toolbar"
          aria-label="PDF નિયંત્રણો"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScale((s) => clampScale(s - SCALE_STEP))}
            disabled={scale <= MIN_SCALE}
            aria-label="ઝૂમ ઘટાડો"
            className="px-2 py-1.5 sm:px-2.5 sm:py-2"
          >
            <Minus size={16} strokeWidth={2.6} />
          </Button>

          <span className="min-w-[3.1rem] text-center text-[0.72rem] font-bold text-[var(--fg)] tabular-nums sm:min-w-[3.6rem] sm:text-[0.82rem]">
            {toGujaratiDigits(zoomPercent)}%
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScale((s) => clampScale(s + SCALE_STEP))}
            disabled={scale >= MAX_SCALE}
            aria-label="ઝૂમ વધારો"
            className="px-2 py-1.5 sm:px-2.5 sm:py-2"
          >
            <Plus size={16} strokeWidth={2.6} />
          </Button>

          <span
            className="mx-0.5 h-5 w-px shrink-0 bg-[var(--stroke-strong)] sm:mx-1"
            aria-hidden="true"
          />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleFit}
            aria-label="પહોળાઈ પ્રમાણે ફિટ કરો"
            className="gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2"
          >
            <Maximize2 size={15} strokeWidth={2.5} />
            <span className="hidden sm:inline">ફિટ</span>
          </Button>

          <span
            className="mx-0.5 h-5 w-px shrink-0 bg-[var(--stroke-strong)] sm:mx-1"
            aria-hidden="true"
          />

          <span
            className="px-1 text-[0.72rem] font-semibold whitespace-nowrap text-[var(--fg-muted)] sm:px-1.5 sm:text-[0.82rem]"
            aria-live="polite"
          >
            <span className="hidden sm:inline">પાનું </span>
            {toGujaratiDigits(shownPage)} / {toGujaratiDigits(numPages)}
          </span>
        </div>
      ) : null}
    </main>
  );
}
