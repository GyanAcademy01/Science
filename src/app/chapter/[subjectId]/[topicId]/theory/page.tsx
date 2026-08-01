import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClipboardCheck, FileText } from "lucide-react";
import { TheoryRenderer } from "@/components/theory/TheoryRenderer";
import { FontSizeControl } from "@/components/common/FontSizeControl";
import { BackArrow } from "@/components/common/BackArrow";
import { LinkButton } from "@/components/ui/Button";
import { getTopic } from "@/lib/data";
import { allTopicParams, getTheory } from "@/lib/content";

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
      <div className="relative mb-5 flex min-h-[36px] items-center justify-between">
        <BackArrow href={`/chapter/${subjectId}`} label="પ્રકરણો" />

        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-full shadow-md shadow-black/10 dark:shadow-black/40">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-500 text-xs sm:text-sm">📖</div>
          <span className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight uppercase max-w-[150px] sm:max-w-[240px] truncate">{theory.chapterTitle}</span>
          <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-teal-500">થિયરી</span>
          </div>
        </div>

        <FontSizeControl />
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
            href={`/pdf-view?file=${encodeURIComponent(topic.pdfUrl)}&title=${encodeURIComponent(topic.title)}`}
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
