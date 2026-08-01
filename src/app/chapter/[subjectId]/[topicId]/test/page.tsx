import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { TestSetGrid } from "@/components/test/TestSetGrid";
import { BackArrow } from "@/components/common/BackArrow";
import { LinkButton } from "@/components/ui/Button";
import { getTopic } from "@/lib/data";
import { allTopicParams, getChapterTests } from "@/lib/content";
import { toGujaratiDigits } from "@/lib/utils";

export function generateStaticParams() {
  return allTopicParams();
}

export async function generateMetadata(props: {
  params: Promise<{ subjectId: string; topicId: string }>;
}): Promise<Metadata> {
  const { subjectId, topicId } = await props.params;
  const chapter = getChapterTests(subjectId, topicId);
  return {
    title: chapter ? `${chapter.chapterTitle} — ટેસ્ટ` : "ટેસ્ટ",
  };
}

export default async function TestSelectPage(props: {
  params: Promise<{ subjectId: string; topicId: string }>;
}) {
  const { subjectId, topicId } = await props.params;
  const found = getTopic(subjectId, topicId);
  const chapter = getChapterTests(subjectId, topicId);
  if (!found || !chapter) notFound();

  const totalQuestions = chapter.sets.reduce(
    (sum, set) => sum + set.totalQuestions,
    0,
  );

  return (
    <main className="mx-auto w-full max-w-[1000px] px-3 py-4 sm:px-6 sm:py-6">
      {/* 🚀 Header Bar matching Hindi Project style */}
      <div className="relative mb-5 flex min-h-[36px] items-center justify-center">
        <div className="absolute left-0">
          <BackArrow href={`/chapter/${subjectId}`} label="પ્રકરણો" />
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-full shadow-lg shadow-black/10 dark:shadow-black/40">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-500 text-xs sm:text-sm">✏️</div>
          <span className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 tracking-tight uppercase max-w-[150px] sm:max-w-[240px] truncate">{chapter.chapterTitle}</span>
          <span className="text-zinc-300 dark:text-zinc-700 text-xs">•</span>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-violet-500">ટેસ્ટ</span>
          </div>
        </div>
      </div>

      {/* Modern Test Cards Grid */}
      <TestSetGrid
        sets={chapter.sets}
        subjectId={subjectId}
        topicId={topicId}
      />

      <div className="mt-8 flex justify-center">
        <LinkButton
          href={`/chapter/${subjectId}/${topicId}/theory`}
          variant="outline"
          size="md"
          className="rounded-full text-xs px-5"
        >
          <BookOpen size={14} strokeWidth={2.4} className="mr-1" />
          પહેલાં થિયરી વાંચો
        </LinkButton>
      </div>
    </main>
  );
}
