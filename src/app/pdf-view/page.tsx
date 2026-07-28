import { Suspense } from "react";
import type { Metadata } from "next";
import { AtomLoader } from "@/components/ui/AtomLoader";
import PDFViewer from "./PDFViewer";

export const metadata: Metadata = {
  title: "PDF",
};

export default function PDFViewPage() {
  return (
    <Suspense fallback={<AtomLoader label="PDF તૈયાર થાય છે…" />}>
      <PDFViewer />
    </Suspense>
  );
}
