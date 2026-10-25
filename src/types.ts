// One marked stretch of the text: "start" is included, "end" is not.
export interface Span {
    start: number;
    end: number;
  }

// all the values that a teacher can enter
export interface AnnotationValues {
  category: string;
  weight: number;
  comment: string;
}

// A span with an id and the entered values.
export interface Annotation extends Span, AnnotationValues {
  id: string;
}

// A kind of mistake and the color of its marks.
export interface Category {
  name: string;
  title: string;
  color: string;
}