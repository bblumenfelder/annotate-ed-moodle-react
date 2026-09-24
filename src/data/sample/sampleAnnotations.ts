import type { Annotation } from "../../types";

export const sampleAnnotations: Annotation[] = [
  {
    id: "a1",
    start: 19,
    end: 30,
    category: "grammatik",
    weight: 1,
    comment: "Dativ: „in seinem Buch“.",
  },
  {
    id: "a2",
    start: 31,
    end: 46,
    category: "inhalt",
    weight: 2,
    comment: "Platons Werk heißt „Politeia“ (Der Staat), nicht „Der Politiker“.",
  },
  {
    id: "a3",
    start: 641,
    end: 668,
    category: "inhalt",
    weight: 2,
    comment:
      "Bei Platon regieren die Philosophen selbst (Philosophenherrscher) — sie sind nicht bloß Berater.",
  },
  {
    id: "a4",
    start: 661,
    end: 701,
    category: "ausdruck",
    weight: 1,
    comment: "Umgangssprachlich: „weil die ja …“. Besser: „da sie als besonders weise gelten“.",
  },
];