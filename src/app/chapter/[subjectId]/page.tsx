import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ClipboardCheck, FileText, Sparkles } from "lucide-react";
import { HexBadge } from "@/components/common/HexBadge";
import { BackArrow } from "@/components/common/BackArrow";
import { getSubject, subjects } from "@/lib/data";
import { toGujaratiDigits } from "@/lib/utils";

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
    <main className="mx-auto w-full max-w-[1060px] px-3 py-3 sm:px-5 sm:py-5">
      <BackArrow href="/subjects" label="વિષયો" />

      {/* 🚀 Header */}
      <header className="relative mt-1 mb-5 text-center">
        <div className="absolute inset-0 mx-auto h-20 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--stroke-strong)] bg-[var(--surface)] px-3.5 py-1 text-xs font-semibold text-[var(--fg-muted)] shadow-sm backdrop-blur-md">
            <Sparkles size={13} className="text-[var(--brand-1)] animate-pulse" />
            <span>{subject.name} · Gyan Academy</span>
          </div>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            <span className="text-grad">{subject.name}</span>
          </h1>

          <p className="mt-1.5 text-xs sm:text-sm text-[var(--fg-muted)] max-w-[480px] mx-auto leading-relaxed">
            કુલ {toGujaratiDigits(subject.topicCount)} પ્રકરણ ·{" "}
            {toGujaratiDigits(subject.questionCount)} ઇન્ટરેક્ટિવ પ્રશ્નો અને ઓરિજિનલ PDF.
          </p>
        </div>
      </header>

      {/* 🌟 Chapter Cards Grid - Tighter width & Snug Fit */}
      <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {subject.topics.map((topic, index) => (
          <div
            key={topic.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] p-4 sm:p-4.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--stroke-strong)] hover:shadow-xl anim-fade-up"
            style={{ animationDelay: `${index * 0.05}s` }}
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
                  <span className="inline-block rounded-full bg-[var(--surface-2)] border border-[var(--stroke)] px-2.5 py-0.5 text-[0.65rem] font-bold text-[var(--fg-muted)] uppercase tracking-wide">
                    પ્રકરણ {toGujaratiDigits(topic.number)}
                  </span>
                  <h2 className="text-[0.95rem] font-extrabold text-[var(--fg)] group-hover:text-[var(--brand-1)] transition-colors mt-1 leading-snug">
                    {topic.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="relative z-10 mt-3.5 pt-3 border-t border-[var(--stroke)]/60 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {topic.hasTheory && (
                <Link
                  href={`/chapter/${subject.id}/${topic.id}/theory`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4.5 py-1.5 min-w-[88px] text-[0.78rem] font-extrabold shadow-sm shadow-cyan-500/25 transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/40 hover:scale-[1.03] active:scale-95 shrink-0"
                >
                  <BookOpen size={14} strokeWidth={2.4} />
                  <span>થિયરી</span>
                </Link>
              )}

              {topic.hasTest && (
                <Link
                  href={`/chapter/${subject.id}/${topic.id}/test`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4.5 py-1.5 min-w-[88px] text-[0.78rem] font-extrabold shadow-sm shadow-violet-500/25 transition-all duration-300 hover:shadow-md hover:shadow-violet-500/40 hover:scale-[1.03] active:scale-95 shrink-0"
                >
                  <ClipboardCheck size={14} strokeWidth={2.4} />
                  <span>ટેસ્ટ</span>
                </Link>
              )}

              {topic.pdfUrl && (
                <Link
                  href={`/pdf-view?file=${encodeURIComponent(topic.pdfUrl)}&title=${encodeURIComponent(topic.title)}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4.5 py-1.5 min-w-[88px] text-[0.78rem] font-extrabold shadow-sm shadow-amber-500/25 transition-all duration-300 hover:shadow-md hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-95 shrink-0"
                >
                  <FileText size={14} strokeWidth={2.4} />
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
