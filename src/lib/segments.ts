import type { Span } from "../types";

// One piece of the text plus all spans that cover it.
export interface Segment {
  start: number;
  end: number;
  spans: Span[];
}

// Cuts the text at every start and every end of a span (overlaps allowed).
export function splitIntoSegments(text: string, spans: Span[]): Segment[] {
  const boundaries = new Set([0, text.length]);
  for (const span of spans) {
    boundaries.add(span.start);
    boundaries.add(span.end);
  }
  const sorted = [...boundaries].sort((a, b) => a - b);

  const segments: Segment[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const end = sorted[i + 1];
    // A span covers the segment if it starts at or before it and ends at or after it.
    const covering = spans.filter((s) => s.start <= start && s.end >= end);
    segments.push({ start, end, spans: covering });
  }
  return segments;
}
