import { describe, expect, test } from "@jest/globals";
import { splitIntoPieces } from "../../src/lib/segments";
import { sampleText } from "../../src/data/sampleText";
describe("splitIntoPieces", () => {
  test("cuts a short text into three pieces", () => {
    const text = "Hallo schöne Welt";
    const pieces = splitIntoPieces(text, [{ start: 6, end: 12 }]);

    expect(pieces).toEqual([
      { start: 0, end: 6, marked: false },
      { start: 6, end: 12, marked: true },
      { start: 12, end: 17, marked: false },
    ]);
  });


  test("pieces put together give the whole text again", () => {
    const spans = [
      { start: 19, end: 30 },
      { start: 31, end: 46 },
      { start: 641, end: 668 },
    ];
    const pieces = splitIntoPieces(sampleText, spans);
    const joined = pieces
      .map((piece) => sampleText.slice(piece.start, piece.end))
      .join("");

    expect(joined).toBe(sampleText);
  });

  test("span at the start of the text: no empty piece in front", () => {
    const pieces = splitIntoPieces("Hallo schöne Welt", [{ start: 0, end: 5 }]);

    expect(pieces).toEqual([
      { start: 0, end: 5, marked: true },
      { start: 5, end: 17, marked: false },
    ]);
  });

  test("span at the end of the text: no empty piece behind", () => {
    const pieces = splitIntoPieces("Hallo schöne Welt", [{ start: 13, end: 17 }]);

    expect(pieces).toEqual([
      { start: 0, end: 13, marked: false },
      { start: 13, end: 17, marked: true },
    ]);
  });

  test("two spans that touch: no empty piece between them", () => {
    const pieces = splitIntoPieces("Hallo schöne Welt", [
      { start: 0, end: 5 },
      { start: 5, end: 12 },
    ]);

    expect(pieces).toEqual([
      { start: 0, end: 5, marked: true },
      { start: 5, end: 12, marked: true },
      { start: 12, end: 17, marked: false },
    ]);
  });
});