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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <BackArrow href={`/chapter/${subjectId}`} label="પ્રકરણો" />
        <FontSizeControl />
      </div>

      <header className="mt-3 mb-3.5 text-center">
        <p className="text-[0.68rem] font-bold uppercase tracking-wide text-[var(--fg-muted)]">
          પ્રકરણ {topic.number}
        </p>
        <h1 className="mt-0.5 text-[1.15rem] sm:text-[1.5rem]">
          <span className="text-grad">{theory.chapterTitle}</span>
        </h1>
        <p className="mx-auto mt-1.5 max-w-[580px] text-[0.79rem] leading-relaxed text-[var(--fg-muted)]">
          {theory.description}
        </p>
      </header>

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
