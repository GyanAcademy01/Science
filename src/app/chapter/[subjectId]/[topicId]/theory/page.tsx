import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClipboardCheck, FileText } from "lucide-react";
import { TheoryRenderer } from "@/components/theory/TheoryRenderer";
import { BackArrow } from "@/components/common/BackArrow";
import { LinkButton } from "@/components/ui/Button";
import { getTopic } from "@/lib/data";
import { allTopicParams, getTheory } from "@/lib/content";
import { buildPdfViewerHref } from "@/lib/pdf";

export function generateStaticParams() {
  return allTopicParams();
}

export async function generateMetadata(props: {
  params: Promise<{ subjectId: string; topicId: string }>;
}): Promise<Metadata> {
  const { subjectId, topicId } = await props.params;
  const theory = getTheory(subjectId, topicId);
  return {
    title: theory ? `${theory.chapterTitle} — થિયરી` : "થિયરી",
    description: theory?.description,
  };
}

export default async function TheoryPage(props: {
  params: Promise<{ subjectId: string; topicId: string }>;
}) {
  const { subjectId, topicId } = await props.params;
  const found = getTopic(subjectId, topicId);
  const theory = getTheory(subjectId, topicId);
  if (!found || !theory) notFound();

  const { topic } = found;

  return (
    <main className="mx-auto w-full max-w-[900px] px-2 py-3 sm:px-3 sm:py-5">
      {/* 🚀 Header Bar matching Hindi Project style */}
      <div className="relative mb-5 flex min-h-[36px] items-center justify-center px-2 sm:px-0">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 sm:left-0 sm:top-1/2">
          <BackArrow href={`/chapter/${subjectId}`} label="પ્રકરણો" />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-full shadow-md shadow-black/10 dark:shadow-black/40">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-500 text-xs sm:text-sm shrink-0">📖</div>
          
          <span className="px-2 py-0.5 rounded border border-teal-100 bg-teal-50 text-teal-600 text-[0.65rem] sm:text-xs font-black tracking-wider shrink-0">
            {found.subject.name}
          </span>

          <span className="text-[0.75rem] sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight truncate max-w-[100px] sm:max-w-[220px]">
            {theory.chapterTitle}
          </span>
          
          <span className="text-zinc-300 dark:text-zinc-700 text-xs shrink-0">•</span>
          
          <div className="flex items-center gap-1 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[0.7rem] sm:text-sm font-bold text-teal-500">થિયરી</span>
          </div>
        </div>
      </div>

      <TheoryRenderer sections={theory.sections} />

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {topic.hasTest && (
          <LinkButton
            href={`/chapter/${subjectId}/${topicId}/test`}
            size="lg"
            className="shimmer-cta"
          >
            <ClipboardCheck size={15} strokeWidth={2.4} />
            ટેસ્ટ આપો
          </LinkButton>
        )}
        {topic.pdfUrl && (
          <LinkButton
            href={buildPdfViewerHref(subjectId, topicId)}
            variant="outline"
            size="lg"
          >
            <FileText size={15} strokeWidth={2.4} />
            મૂળ PDF
          </LinkButton>
        )}
      </div>
    </main>
  );
}
