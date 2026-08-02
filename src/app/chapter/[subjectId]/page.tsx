import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ClipboardCheck, FileText } from "lucide-react";
import { HexBadge } from "@/components/common/HexBadge";
import { BackArrow } from "@/components/common/BackArrow";
import { getSubject, subjects } from "@/lib/data";
import { toGujaratiDigits } from "@/lib/utils";
import { buildPdfViewerHref } from "@/lib/pdf";

export function generateStaticParams() {
  return subjects.map((subject) => ({ subjectId: subject.id }));
}

export async function generateMetadata(props: {
  params: Promise<{ subjectId: string }>;
}): Promise<Metadata> {
  const { subjectId } = await props.params;
  const subject = getSubject(subjectId);
  return {
    title: subject ? `${subject.name} — પ્રકરણો` : "પ્રકરણો",
    description: subject?.description,
  };
}

export default async function ChapterListPage(props: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await props.params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();

  return (
    <main className="mx-auto w-full max-w-[1180px] px-3 py-3 sm:px-5 sm:py-4">
      {/* 🚀 Header Bar matching Hindi Project style */}
      <div className="relative mb-4 flex min-h-[34px] items-center justify-center">
        <div className="absolute left-0">
          <BackArrow href="/subjects" label="વિષયો" />
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-full shadow-md shadow-black/10 dark:shadow-black/40">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-xs sm:text-sm">{subject.icon}</div>
          <span className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight uppercase">{subject.name}</span>
          <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: subject.color }} />
            <span className="text-xs sm:text-sm font-bold" style={{ color: subject.color }}>પ્રકરણો</span>
          </div>
        </div>
      </div>

      {/* 🌟 Chapter Cards Grid - 3 Columns on desktop */}
      <div className="grid gap-3 sm:gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {subject.topics.map((topic, index) => (
          <div
            key={topic.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] p-3.5 sm:p-4 min-h-[148px] sm:min-h-[158px] shadow-md shadow-black/10 dark:shadow-black/50 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--stroke-strong)] hover:shadow-xl anim-fade-up"
            style={{ animationDelay: `${index * 0.04}s` }}
          >
            {/* Background glow on card hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

            <div className="relative z-10">
              {/* Card Top: HexBadge + Chapter Number + Title */}
              <div className="flex items-start gap-3">
                <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <HexBadge size={38}>{topic.number}</HexBadge>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block rounded-full bg-[var(--surface-2)] border border-[var(--stroke)] px-2.5 py-0.5 text-[0.64rem] font-bold text-[var(--fg-muted)] uppercase tracking-wide">
                    પ્રકરણ {toGujaratiDigits(topic.number)}
                  </span>
                  <h2 className="text-[0.95rem] font-extrabold text-[var(--fg)] group-hover:text-[var(--brand-1)] transition-colors mt-0.5 leading-snug">
                    {topic.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="relative z-10 mt-3 pt-2.5 border-t border-[var(--stroke)]/60 grid grid-cols-3 gap-1.5 sm:gap-2">
              {topic.hasTheory && (
                <Link
                  href={`/chapter/${subject.id}/${topic.id}/theory`}
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 py-1.5 text-[0.76rem] font-bold shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-95 text-center whitespace-nowrap"
                >
                  <BookOpen size={13.5} strokeWidth={2.4} className="shrink-0" />
                  <span>Theory</span>
                </Link>
              )}

              {topic.hasTest && (
                <Link
                  href={`/chapter/${subject.id}/${topic.id}/test`}
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 px-2 py-1.5 text-[0.76rem] font-bold shadow-xs transition-all duration-200 hover:border-emerald-400 hover:scale-[1.02] active:scale-95 text-center whitespace-nowrap"
                >
                  <ClipboardCheck size={13.5} strokeWidth={2.4} className="shrink-0 text-emerald-500 dark:text-emerald-400" />
                  <span>Test</span>
                </Link>
              )}

              {topic.pdfUrl && (
                <Link
                  href={buildPdfViewerHref(subject.id, topic.id)}
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/40 dark:to-orange-950/30 border border-rose-200/80 dark:border-rose-800/50 text-rose-600 dark:text-rose-400 px-2 py-1.5 text-[0.76rem] font-extrabold shadow-xs transition-all duration-200 hover:border-rose-400 hover:scale-[1.02] active:scale-95 text-center whitespace-nowrap"
                >
                  <FileText size={13.5} strokeWidth={2.4} className="shrink-0 text-rose-500 dark:text-rose-400" />
                  <span>PDF</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
