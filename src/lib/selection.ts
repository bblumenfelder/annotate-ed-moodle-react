import type { Span } from "../types";

// Turns the browser selection into positions in the text of root.
export function getSelectedSpan(root: HTMLElement): Span | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
  const range = selection.getRangeAt(0);
  // Moodle rule: Only selections inside our own container count.
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return null;
  // Measure the text from the start of the container up to the selection.
  const before = document.createRange();
  before.selectNodeContents(root);
  before.setEnd(range.startContainer, range.startOffset);
  const start = before.toString().length;
  const end = start + range.toString().length;
  return { start, end };
}