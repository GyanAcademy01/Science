import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AtomLoader } from "@/components/ui/AtomLoader";
import { resolvePdfRequest, type PdfViewerRequest } from "@/lib/pdf";
import PDFViewer from "./PDFViewer";

export const metadata: Metadata = {
  title: "PDF",
};

type SearchParams = Record<string, string | string[] | undefined>;

function firstQueryValue(value: string | string[] | undefined): string | null {
  return typeof value === "string" ? value : null;
}

export default async function PDFViewPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = await searchParams;
  const request: PdfViewerRequest | null = resolvePdfRequest({
    subject: firstQueryValue(query.subject),
    topic: firstQueryValue(query.topic),
    file: firstQueryValue(query.file),
  });

  if (!request) notFound();

  return (
    <Suspense fallback={<AtomLoader label="PDF તૈયાર થાય છે…" />}>
      <PDFViewer request={request} />
    </Suspense>
  );
}
