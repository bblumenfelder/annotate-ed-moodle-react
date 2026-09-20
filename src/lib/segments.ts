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