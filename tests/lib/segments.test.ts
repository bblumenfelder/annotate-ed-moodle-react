import { describe, expect, test } from "@jest/globals";
import { splitIntoPieces } from "../../src/lib/segments";

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
});