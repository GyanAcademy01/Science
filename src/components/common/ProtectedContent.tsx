"use client";

import type {
  ClipboardEvent,
  DragEvent,
  MouseEvent,
  ReactNode,
  SyntheticEvent,
} from "react";
import { useEffect, useRef } from "react";

const INTERACTIVE_TARGET_SELECTOR = [
  "input",
  "textarea",
  "select",
  "button",
  "a",
  "form",
  "[contenteditable=\"true\"]",
  "[role=\"button\"]",
  "[role=\"link\"]",
  "[tabindex]:not([tabindex=\"-1\"])",
].join(", ");

type ProtectedEvent =
  | ClipboardEvent<HTMLDivElement>
  | DragEvent<HTMLDivElement>
  | MouseEvent<HTMLDivElement>
  | SyntheticEvent<HTMLDivElement>;

function isInteractiveTarget(target: EventTarget | null): boolean {
  return (
    target instanceof Element &&
    target.closest(INTERACTIVE_TARGET_SELECTOR) !== null
  );
}

function preventProtectedAction(event: ProtectedEvent) {
  if (!isInteractiveTarget(event.target)) {
    event.preventDefault();
  }
}

export function ProtectedContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleSelectStart = (event: Event) => {
      if (!isInteractiveTarget(event.target)) {
        event.preventDefault();
      }
    };

    content.addEventListener("selectstart", handleSelectStart);
    return () => content.removeEventListener("selectstart", handleSelectStart);
  }, []);

  return (
    <div
      ref={contentRef}
      className={["protected-reading", className].filter(Boolean).join(" ")}
      onCopy={preventProtectedAction}
      onCut={preventProtectedAction}
      onContextMenu={preventProtectedAction}
      onDragStart={preventProtectedAction}
    >
      {children}
    </div>
  );
}
