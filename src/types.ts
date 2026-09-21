// One marked stretch of the text: "start" is included, "end" is not.
export interface Span {
    start: number;
    end: number;
  }

// A span with a category, e.g. "grammatik".
export interface Annotation extends Span {
  category: string;
}

// A kind of mistake and the color of its marks.
export interface Category {
  name: string;
  color: string;
}