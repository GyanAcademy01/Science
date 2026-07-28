import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Sparkles } from "lucide-react";
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
      <BackArrow href={`/chapter/${subjectId}`} label="પ્રકરણો" />

      {/* Header */}
      <header className="mt-2 mb-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--stroke-strong)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--fg-muted)] shadow-sm">
          <Sparkles size={13} className="text-[var(--brand-1)]" />
          પ્રકરણ {toGujaratiDigits(found.topic.number)} · સ્વ-મૂલ્યાંકન ટેસ્ટ
        </span>
        <h1 className="mt-2 text-xl font-extrabold sm:text-2xl lg:text-3xl">
          <span className="text-grad">{chapter.chapterTitle}</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--fg-muted)] max-w-[500px] mx-auto">
          કુલ {toGujaratiDigits(totalQuestions)} પ્રશ્નો ·{" "}
          {toGujaratiDigits(chapter.sets.length)} ઇન્ટરેક્ટિવ સેટ. દરેક પ્રશ્ન સાથે તુરંત વિસ્તૃત સમજૂતી મળશે.
        </p>
      </header>

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
