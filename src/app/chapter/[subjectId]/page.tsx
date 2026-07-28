import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, ClipboardCheck, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ChipLink } from "@/components/ui/Chip";
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
    <main className="mx-auto w-full max-w-[1200px] px-2.5 py-3 sm:px-3 sm:py-5">
      <BackArrow href="/subjects" label="વિષયો" />

      <header className="mt-3 mb-4 text-center">
        <h1 className="text-[1.25rem] sm:text-[1.6rem]">
          <span className="text-grad">{subject.name}</span>
        </h1>
        <p className="mt-1.5 text-[0.8rem] text-[var(--fg-muted)]">
          {toGujaratiDigits(subject.topicCount)} પ્રકરણ ·{" "}
          {toGujaratiDigits(subject.questionCount)} પ્રશ્નો
        </p>
      </header>

      <div className="grid gap-1.5 sm:gap-2.5 md:grid-cols-2 lg:grid-cols-3">
        {subject.topics.map((topic, index) => (
          <Card
            key={topic.id}
            hover
            className="anim-fade-up flex flex-col p-3 sm:p-3.5"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="flex items-center gap-2.5">
              <HexBadge size={33} className="sm:hidden">
                {topic.number}
              </HexBadge>
              <span className="hidden sm:block">
                <HexBadge size={38}>{topic.number}</HexBadge>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.68rem] font-bold uppercase tracking-wide text-[var(--fg-muted)]">
                  પ્રકરણ {toGujaratiDigits(topic.number)}
                </p>
                <h2 className="text-[0.9rem] leading-snug sm:text-[0.98rem]">
                  {topic.title}
                </h2>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {topic.hasTheory && (
                <ChipLink
                  href={`/chapter/${subject.id}/${topic.id}/theory`}
                  tone="cyan"
                >
                  <BookOpen size={12} strokeWidth={2.4} />
                  થિયરી
                </ChipLink>
              )}
              {topic.hasTest && (
                <ChipLink
                  href={`/chapter/${subject.id}/${topic.id}/test`}
                  tone="violet"
                >
                  <ClipboardCheck size={12} strokeWidth={2.4} />
                  ટેસ્ટ ({toGujaratiDigits(topic.testSets)})
                </ChipLink>
              )}
              {topic.pdfUrl && (
                <ChipLink
                  href={`/pdf-view?file=${encodeURIComponent(topic.pdfUrl)}&title=${encodeURIComponent(topic.title)}`}
                  tone="amber"
                >
                  <FileText size={12} strokeWidth={2.4} />
                  PDF
                </ChipLink>
              )}
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
