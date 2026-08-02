import { getTopic, subjects } from "@/lib/data";

export interface PdfViewerRequest {
  subjectId: string;
  topicId: string;
  file: string;
  title: string;
  storageKey: string;
}

export function buildPdfViewerHref(subjectId: string, topicId: string): string {
  const params = new URLSearchParams({ subject: subjectId, topic: topicId });
  return `/pdf-view?${params.toString()}`;
}

function toViewerRequest(
  subjectId: string,
  topicId: string,
): PdfViewerRequest | null {
  const found = getTopic(subjectId, topicId);
  if (!found?.topic.pdfUrl) return null;

  return {
    subjectId,
    topicId,
    file: found.topic.pdfUrl,
    title: found.topic.title,
    storageKey: `${subjectId}-${topicId}`,
  };
}

function findTopicByPdfPath(file: string): PdfViewerRequest | null {
  for (const subject of subjects) {
    const topic = subject.topics.find((item) => item.pdfUrl === file);
    if (!topic) continue;

    return toViewerRequest(subject.id, topic.id);
  }

  return null;
}

export function resolvePdfRequest(params: {
  subject?: string | null;
  topic?: string | null;
  file?: string | null;
}): PdfViewerRequest | null {
  const subjectId = params.subject?.trim() ?? "";
  const topicId = params.topic?.trim() ?? "";
  const stableRequest =
    subjectId && topicId ? toViewerRequest(subjectId, topicId) : null;

  if (stableRequest) return stableRequest;

  // Legacy links are accepted only when the complete path matches an allowlist entry.
  const legacyFile = params.file?.trim();
  return legacyFile ? findTopicByPdfPath(legacyFile) : null;
}
