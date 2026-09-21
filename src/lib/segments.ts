import type { Span } from "../types";


// One piece of the text: either marked not.
export interface Piece {
    start: number;
    end: number;
    marked: boolean;
  }



  // Cuts the text into marked and plain pieces (no overlaps).
export function splitIntoPieces(text: string, spans: Span[]): Piece[] {

    // Copy first: "sort" changes the array, and props are read-only.
    const sorted = [...spans].sort((a, b) => a.start - b.start);
  const pieces: Piece[] = [];
  let cursor = 0;

  for (const span of sorted) {
    if (span.start > cursor) {
      pieces.push({ start: cursor, end: span.start, marked: false });
    }
    pieces.push({ start: span.start, end: span.end, marked: true });
    cursor = span.end;
  }

  if (cursor < text.length) {
    pieces.push({ start: cursor, end: text.length, marked: false });
  }

  return pieces;
}


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
    segments.push({ start: sorted[i], end: sorted[i + 1], spans: [] });
  }
  return segments;
}