import { describe, expect, test } from "@jest/globals";
import { splitIntoSegments } from "../../src/lib/segments";
import { sampleText } from "../../src/data/sampleText";

describe("splitIntoSegments", () => {
  test("cuts a short text into three segments", () => {
    const text = "Hallo schöne Welt";
    const span = { start: 6, end: 12 };
    const segments = splitIntoSegments(text, [span]);

    expect(segments).toEqual([
      { start: 0, end: 6, spans: [] },
      { start: 6, end: 12, spans: [span] },
      { start: 12, end: 17, spans: [] },
    ]);
  });

  test("segments put together give the whole text again", () => {
    const spans = [
      { start: 19, end: 30 },
      { start: 31, end: 46 },
      { start: 641, end: 668 },
      { start: 661, end: 701 },
    ];
    const segments = splitIntoSegments(sampleText, spans);
    const joined = segments
      .map((segment) => sampleText.slice(segment.start, segment.end))
      .join("");

    expect(joined).toBe(sampleText);
  });

  test("span at the start of the text: no empty segment in front", () => {
    const span = { start: 0, end: 5 };
    const segments = splitIntoSegments("Hallo schöne Welt", [span]);

    expect(segments).toEqual([
      { start: 0, end: 5, spans: [span] },
      { start: 5, end: 17, spans: [] },
    ]);
  });

  test("span at the end of the text: no empty segment behind", () => {
    const span = { start: 13, end: 17 };
    const segments = splitIntoSegments("Hallo schöne Welt", [span]);

    expect(segments).toEqual([
      { start: 0, end: 13, spans: [] },
      { start: 13, end: 17, spans: [span] },
    ]);
  });

  test("two spans that touch: no empty segment between them", () => {
    const a = { start: 0, end: 5 };
    const b = { start: 5, end: 12 };
    const segments = splitIntoSegments("Hallo schöne Welt", [a, b]);

    expect(segments).toEqual([
      { start: 0, end: 5, spans: [a] },
      { start: 5, end: 12, spans: [b] },
      { start: 12, end: 17, spans: [] },
    ]);
  });

  test("overlapping spans: no text is doubled", () => {
    const text = "Sie werden von den Philosophen beraten, weil die ja klug sind.";
    const segments = splitIntoSegments(text, [
      { start: 11, end: 38 },
      { start: 31, end: 61 },
    ]);
    const joined = segments
      .map((segment) => text.slice(segment.start, segment.end))
      .join("");

    expect(joined).toBe(text);
  });

  test("overlapping spans: each segment knows its spans", () => {
    const text = "Sie werden von den Philosophen beraten, weil die ja klug sind.";
    const a = { start: 11, end: 38 };
    const b = { start: 31, end: 61 };
    const segments = splitIntoSegments(text, [a, b]);

    expect(segments).toEqual([
      { start: 0, end: 11, spans: [] },
      { start: 11, end: 31, spans: [a] },
      { start: 31, end: 38, spans: [a, b] },
      { start: 38, end: 61, spans: [b] },
      { start: 61, end: 62, spans: [] },
    ]);
  });
});
