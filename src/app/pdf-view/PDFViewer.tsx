"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type DragEvent,
  type KeyboardEvent,
  type MouseEvent,
  type SyntheticEvent,
} from "react";
import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
  RenderTask,
} from "pdfjs-dist";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minus,
  Plus,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";
import { BackArrow } from "@/components/common/BackArrow";
import { Button } from "@/components/ui/Button";
import { AtomLoader } from "@/components/ui/AtomLoader";
import type { PdfViewerRequest } from "@/lib/pdf";
import { toGujaratiDigits } from "@/lib/utils";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.2;
const CARD_GUTTER = 12;
const PDF_CACHE_NAME = "science-pdf-cache-v1";
const PDF_CACHE_INDEX_KEY = "science-pdf-cache-index-v1";
const PDF_CACHE_MAX_ENTRIES = 6;
const PDF_PAGE_STORAGE_PREFIX = "science-pdf-page-v1:";
const PDF_NEARBY_MARGIN = "900px 0px";

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

interface PDFPageProps {
  doc: PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  box: PageBox;
}

const clampScale = (value: number): number =>
  Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(value * 100) / 100));

function isPdfContentType(response: Response): boolean {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  return !contentType || contentType.includes("application/pdf");
}

async function readValidatedPdf(response: Response): Promise<ArrayBuffer | null> {
  if (!response.ok || !isPdfContentType(response)) return null;

  const bytes = await response.arrayBuffer();
  if (bytes.byteLength < 5) return null;

  const header = new TextDecoder().decode(bytes.slice(0, 5));
  return header === "%PDF-" ? bytes : null;
}

function readCacheIndex(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(PDF_CACHE_INDEX_KEY) ?? "null");
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function writeCacheIndex(urls: string[]): void {
  try {
    localStorage.setItem(PDF_CACHE_INDEX_KEY, JSON.stringify(urls));
  } catch {
    // Cache storage remains useful when localStorage is unavailable.
  }
}

async function rememberCacheEntry(cache: Cache, url: string): Promise<void> {
  try {
    const requests = await cache.keys();
    const knownUrls = new Set(requests.map((request) => request.url));
    const indexedUrls = readCacheIndex().filter((item) => knownUrls.has(item));
    const orderedUrls = [url, ...indexedUrls, ...requests.map((request) => request.url)].filter(
      (item, index, items) => items.indexOf(item) === index,
    );
    const keepUrls = new Set(orderedUrls.slice(0, PDF_CACHE_MAX_ENTRIES));

    await Promise.all(
      requests
        .filter((request) => !keepUrls.has(request.url))
        .map((request) => cache.delete(request)),
    );
    writeCacheIndex([...keepUrls]);
  } catch {
    // Cache errors must never prevent the network path from loading a PDF.
  }
}

async function loadPdfBytes(file: string, signal: AbortSignal): Promise<ArrayBuffer> {
  const url = new URL(file, window.location.origin).toString();
  let cache: Cache | null = null;

  if ("caches" in window) {
    try {
      cache = await window.caches.open(PDF_CACHE_NAME);
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        const cachedBytes = await readValidatedPdf(cachedResponse.clone());
        if (cachedBytes) {
          await rememberCacheEntry(cache, url);
          return cachedBytes;
        }

        await cache.delete(url);
      }
    } catch {
      // A broken/unavailable cache falls through to the network request.
    }
  }

  const networkResponse = await fetch(url, { cache: "no-store", signal });
  const networkBytes = await readValidatedPdf(networkResponse.clone());
  if (!networkBytes) throw new Error("PDF response failed validation");

  if (cache) {
    try {
      await cache.put(url, networkResponse);
      await rememberCacheEntry(cache, url);
    } catch {
      // The validated bytes are still returned when Cache API writes fail.
    }
  }

  return networkBytes;
}

function safeReadPage(storageKey: string): number {
  try {
    const value = Number.parseInt(
      localStorage.getItem(`${PDF_PAGE_STORAGE_PREFIX}${encodeURIComponent(storageKey)}`) ?? "",
      10,
    );
    return Number.isInteger(value) && value > 0 ? value : 1;
  } catch {
    return 1;
  }
}

function safeWritePage(storageKey: string, page: number): void {
  try {
    localStorage.setItem(
      `${PDF_PAGE_STORAGE_PREFIX}${encodeURIComponent(storageKey)}`,
      String(page),
    );
  } catch {
    // Reading the PDF remains functional when storage is blocked.
  }
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element &&
    Boolean(target.closest("a,button,input,textarea,select,[contenteditable='true']"));
}

function preventReaderAction(event: SyntheticEvent<HTMLDivElement>): void {
  if (!isInteractiveTarget(event.target)) event.preventDefault();
}

function preventReaderShortcut(event: KeyboardEvent<HTMLDivElement>): void {
  const isCopyOrCut = (event.ctrlKey || event.metaKey) && ["c", "x"].includes(event.key.toLowerCase());
  if (isCopyOrCut && !isInteractiveTarget(event.target)) event.preventDefault();
}

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
    <div className="card anim-fade-up mx-auto my-7 flex max-w-md flex-col items-center gap-2.5 p-5 text-center">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full text-white"
        style={{ background: "var(--grad-brand)" }}
        aria-hidden="true"
      >
        <TriangleAlert size={21} strokeWidth={2.2} />
      </span>
      <h2 className="text-[0.95rem] font-extrabold text-[var(--fg)]">{heading}</h2>
      <p className="text-[0.8rem] leading-relaxed text-[var(--fg-muted)]">{message}</p>
      {onRetry ? (
        <Button variant="solid" size="sm" onClick={onRetry} className="mt-1">
          <RefreshCw size={13} strokeWidth={2.4} />
          ફરી પ્રયાસ કરો
        </Button>
      ) : null}
    </div>
  );
}

function PdfPage({ doc, pageNumber, scale, box }: PDFPageProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setShouldRender(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setShouldRender(true);
      },
      { rootMargin: PDF_NEARBY_MARGIN },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shouldRender) return;

    let cancelled = false;
    let task: RenderTask | null = null;
    let page: PDFPageProxy | null = null;

    const render = async () => {
      try {
        page = await doc.getPage(pageNumber);
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
        await task.promise.catch(() => undefined);
      } finally {
        page?.cleanup();
      }
    };

    void render();
    return () => {
      cancelled = true;
      task?.cancel();
      page?.cleanup();
    };
  }, [doc, pageNumber, scale, shouldRender]);

  return (
    <div
      ref={hostRef}
      data-pdf-page={pageNumber}
      className="card anim-fade-up w-full overflow-x-auto p-1 sm:p-1.5"
      style={{ minHeight: Math.max(180, Math.round(box.height * scale)) }}
    >
      <canvas
        ref={canvasRef}
        className="mx-auto block rounded-[var(--r-md)]"
        aria-label={`પાનું ${toGujaratiDigits(pageNumber)}`}
      />
    </div>
  );
}

export default function PDFViewer({ request }: { request: PdfViewerRequest }) {
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState<LoadedDoc | null>(null);
  const [failedKey, setFailedKey] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const readerRef = useRef<HTMLDivElement | null>(null);
  const restoredKeyRef = useRef<string | null>(null);
  const pendingPageRef = useRef(1);

  const loadKey = `${request.storageKey}#${attempt}`;
  const pageStorageKey = useMemo(() => request.storageKey, [request.storageKey]);
  const ready = loaded?.key === loadKey ? loaded : null;
  const status: Status = ready ? "ready" : failedKey === loadKey ? "error" : "loading";
  const doc = ready?.doc ?? null;
  const pageBox = ready?.box ?? null;
  const numPages = ready?.numPages ?? 0;

  const fitScaleFor = useCallback((box: PageBox | null): number => {
    const shell = shellRef.current;
    if (!box || !shell || box.width <= 0) return 1;
    const available = shell.clientWidth - CARD_GUTTER;
    return available > 0 ? clampScale(available / box.width) : 1;
  }, []);

  const handleFit = useCallback(() => {
    setScale(fitScaleFor(pageBox));
  }, [fitScaleFor, pageBox]);

  const scrollToPage = useCallback((pageNumber: number) => {
    const element = shellRef.current?.querySelector<HTMLElement>(
      `[data-pdf-page="${pageNumber}"]`,
    );
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentPage(pageNumber);
  }, []);

  useEffect(() => {
    pendingPageRef.current = 1;
    restoredKeyRef.current = null;
    const frame = window.requestAnimationFrame(() => {
      const page = safeReadPage(pageStorageKey);
      pendingPageRef.current = page;
      setCurrentPage(page);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pageStorageKey]);

  useEffect(() => {
    if (status === "ready") safeWritePage(pageStorageKey, currentPage);
  }, [currentPage, pageStorageKey, status]);

  useEffect(() => {
    if (!ready || restoredKeyRef.current === pageStorageKey) return;

    const targetPage = Math.min(Math.max(pendingPageRef.current, 1), ready.numPages);
    restoredKeyRef.current = pageStorageKey;
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => scrollToPage(targetPage));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [currentPage, pageStorageKey, ready, scrollToPage]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    let loadingTask: PDFDocumentLoadingTask | null = null;
    let documentProxy: PDFDocumentProxy | null = null;

    const destroyResources = async () => {
      try {
        await loadingTask?.destroy();
      } catch {
        // Cancellation during navigation is expected.
      }
      try {
        await documentProxy?.destroy();
      } catch {
        // Document may already have been destroyed by the loading task.
      }
    };

    const load = async () => {
      try {
        const bytes = await loadPdfBytes(request.file, controller.signal);
        if (cancelled) return;

        const pdfjsLib = await import("pdfjs-dist");
        if (cancelled) return;
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

        loadingTask = pdfjsLib.getDocument({ data: bytes });
        documentProxy = await loadingTask.promise;
        if (cancelled) return;

        const firstPage = await documentProxy.getPage(1);
        if (cancelled) return;
        const viewport = firstPage.getViewport({ scale: 1 });
        firstPage.cleanup();
        const box: PageBox = { width: viewport.width, height: viewport.height };

        setLoaded({ key: loadKey, doc: documentProxy, box, numPages: documentProxy.numPages });
        setFailedKey(null);
        setScale(fitScaleFor(box));
      } catch {
        if (!cancelled) setFailedKey(loadKey);
      }
    };

    void load();
    return () => {
      cancelled = true;
      controller.abort();
      void destroyResources();
    };
  }, [fitScaleFor, loadKey, request.file]);

  useEffect(() => {
    if (status !== "ready" || numPages === 0) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let best = 1;
      let bestDistance = Number.POSITIVE_INFINITY;

      shellRef.current?.querySelectorAll<HTMLElement>("[data-pdf-page]").forEach((element) => {
        const pageNumber = Number(element.dataset.pdfPage);
        if (!pageNumber) return;
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - middle);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = pageNumber;
        }
      });
      setCurrentPage(best);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    frame = window.requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [numPages, status]);

  const pageNumbers = useMemo(
    () => Array.from({ length: numPages }, (_, index) => index + 1),
    [numPages],
  );
  const zoomPercent = Math.round(scale * 100);
  const shownPage = Math.min(Math.max(currentPage, 1), Math.max(numPages, 1));
  const showToolbar = status === "ready" && numPages > 0;

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => preventReaderAction(event);
  const handleCopy = (event: ClipboardEvent<HTMLDivElement>) => preventReaderAction(event);
  const handleCut = (event: ClipboardEvent<HTMLDivElement>) => preventReaderAction(event);
  const handleDragStart = (event: DragEvent<HTMLDivElement>) => preventReaderAction(event);

  useEffect(() => {
    const reader = readerRef.current;
    if (!reader) return;

    const handleNativeSelectStart = (event: Event) => {
      if (!isInteractiveTarget(event.target)) event.preventDefault();
    };
    reader.addEventListener("selectstart", handleNativeSelectStart);
    return () => reader.removeEventListener("selectstart", handleNativeSelectStart);
  }, [status]);

  return (
    <main className="w-full px-2.5 pt-3 pb-20 sm:px-4 sm:pb-24">
      <div ref={shellRef} className="mx-auto w-full max-w-5xl">
        <div className="anim-fade-up mb-3 flex items-center justify-between gap-2">
          <BackArrow href="/subjects" label="પાછળ" />
          <h1
            className="min-w-0 flex-1 truncate text-end text-[0.82rem] font-extrabold text-[var(--fg)] sm:text-[0.98rem]"
            title={request.title}
          >
            {request.title}
          </h1>
        </div>

        {status === "error" ? (
          <ErrorCard
            heading="PDF ખોલી શકાયું નથી"
            message="ફાઇલ લોડ કરવામાં તકલીફ પડી. ઇન્ટરનેટ જોડાણ તપાસીને ફરી પ્રયાસ કરો."
            onRetry={() => setAttempt((value) => value + 1)}
          />
        ) : status === "loading" ? (
          <AtomLoader label="PDF લોડ થાય છે…" />
        ) : (
          <div
            ref={readerRef}
            className="flex flex-col items-center gap-2.5 select-none sm:gap-4"
            onContextMenu={handleContextMenu}
            onCopy={handleCopy}
            onCut={handleCut}
            onDragStart={handleDragStart}
            onKeyDown={preventReaderShortcut}
            tabIndex={-1}
          >
            {doc && pageBox
              ? pageNumbers.map((pageNumber) => (
                  <PdfPage
                    key={pageNumber}
                    doc={doc}
                    pageNumber={pageNumber}
                    scale={scale}
                    box={pageBox}
                  />
                ))
              : null}
          </div>
        )}
      </div>

      {showToolbar ? (
        <div
          className="glass fixed bottom-2.5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-0.5 px-1.5 py-1 sm:bottom-4 sm:gap-1.5 sm:px-2.5 sm:py-1.5"
          style={{ borderRadius: "var(--r-pill)" }}
          role="toolbar"
          aria-label="PDF નિયંત્રણો"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToPage(Math.max(1, shownPage - 1))}
            disabled={shownPage <= 1}
            aria-label="પહેલાનું પાનું"
            className="px-1.5 py-1 sm:px-2 sm:py-1.5"
          >
            <ChevronLeft size={14} strokeWidth={2.6} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScale((value) => clampScale(value - SCALE_STEP))}
            disabled={scale <= MIN_SCALE}
            aria-label="ઝૂમ ઘટાડો"
            className="px-1.5 py-1 sm:px-2 sm:py-1.5"
          >
            <Minus size={14} strokeWidth={2.6} />
          </Button>

          <span className="min-w-[2.8rem] text-center text-[0.68rem] font-bold text-[var(--fg)] tabular-nums sm:min-w-[3.2rem] sm:text-[0.76rem]">
            {toGujaratiDigits(zoomPercent)}%
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScale((value) => clampScale(value + SCALE_STEP))}
            disabled={scale >= MAX_SCALE}
            aria-label="ઝૂમ વધારો"
            className="px-1.5 py-1 sm:px-2 sm:py-1.5"
          >
            <Plus size={14} strokeWidth={2.6} />
          </Button>

          <span
            className="mx-0.5 h-4 w-px shrink-0 bg-[var(--stroke-strong)] sm:mx-1"
            aria-hidden="true"
          />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleFit}
            aria-label="પહોળાઈ પ્રમાણે ફિટ કરો"
            className="gap-1 px-1.5 py-1 sm:px-2.5 sm:py-1.5"
          >
            <Maximize2 size={13} strokeWidth={2.5} />
            <span className="hidden sm:inline">ફિટ</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToPage(Math.min(numPages, shownPage + 1))}
            disabled={shownPage >= numPages}
            aria-label="આગળનું પાનું"
            className="px-1.5 py-1 sm:px-2 sm:py-1.5"
          >
            <ChevronRight size={14} strokeWidth={2.6} />
          </Button>

          <span
            className="mx-0.5 h-4 w-px shrink-0 bg-[var(--stroke-strong)] sm:mx-1"
            aria-hidden="true"
          />
          <span
            className="px-1 text-[0.68rem] font-semibold whitespace-nowrap text-[var(--fg-muted)] sm:px-1.5 sm:text-[0.76rem]"
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
