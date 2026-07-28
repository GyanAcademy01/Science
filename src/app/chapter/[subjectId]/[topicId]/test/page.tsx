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
    <main className="mx-auto w-full max-w-[1000px] px-2.5 py-3 sm:px-3 sm:py-5">
      <BackArrow href={`/chapter/${subjectId}`} label="પ્રકરણો" />

      <header className="mt-3 mb-4 text-center">
        <p className="text-[0.68rem] font-bold uppercase tracking-wide text-[var(--fg-muted)]">
          પ્રકરણ {found.topic.number} · ટેસ્ટ
        </p>
        <h1 className="mt-0.5 text-[1.15rem] sm:text-[1.5rem]">
          <span className="text-grad">{chapter.chapterTitle}</span>
        </h1>
        <p className="mt-1.5 text-[0.79rem] text-[var(--fg-muted)]">
          કુલ {toGujaratiDigits(totalQuestions)} પ્રશ્નો ·{" "}
          {toGujaratiDigits(chapter.sets.length)} સેટમાં વહેંચેલા. કોઈપણ સેટથી
          શરૂ કરો.
        </p>
      </header>

      <TestSetGrid
        sets={chapter.sets}
        subjectId={subjectId}
        topicId={topicId}
      />

      <div className="mt-5 flex justify-center">
        <LinkButton
          href={`/chapter/${subjectId}/${topicId}/theory`}
          variant="outline"
          size="md"
        >
          <BookOpen size={14} strokeWidth={2.4} />
          પહેલાં થિયરી વાંચો
        </LinkButton>
      </div>
    </main>
  );
}
