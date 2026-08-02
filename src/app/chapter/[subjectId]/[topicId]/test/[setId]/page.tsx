import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestShell } from "@/components/test/TestShell";
import { getTopic } from "@/lib/data";
import { allSetParams, getChapterTests, getTestSet } from "@/lib/content";

export function generateStaticParams() {
  return allSetParams();
}

export async function generateMetadata(props: {
  params: Promise<{ subjectId: string; topicId: string; setId: string }>;
}): Promise<Metadata> {
  const { subjectId, topicId, setId } = await props.params;
  const chapter = getChapterTests(subjectId, topicId);
  const set = getTestSet(subjectId, topicId, setId);
  return {
    title:
      chapter && set ? `${chapter.chapterTitle} — ${set.title}` : "ટેસ્ટ",
  };
}

export default async function TestPage(props: {
  params: Promise<{ subjectId: string; topicId: string; setId: string }>;
}) {
  const { subjectId, topicId, setId } = await props.params;
  const found = getTopic(subjectId, topicId);
  const chapter = getChapterTests(subjectId, topicId);
  const set = getTestSet(subjectId, topicId, setId);
  if (!found || !chapter || !set) notFound();

  return (
    <TestShell
      set={set}
      subjectId={subjectId}
      topicId={topicId}
      chapterTitle={chapter.chapterTitle}
    />
  );
}
