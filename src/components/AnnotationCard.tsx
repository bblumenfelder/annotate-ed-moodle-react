import type { CSSProperties } from "react";
import type { Annotation, Category } from "../types";

interface AnnotationCardProps {
  annotation: Annotation;
  text: string;
  categories: Category[];
}

function AnnotationCard({ annotation, text, categories }: AnnotationCardProps) {
  const quote = text.slice(annotation.start, annotation.end);
  const category = categories.find((c) => c.name === annotation.category);
  const style = { "--atd-card-color": category?.color } as CSSProperties;
  return (
    <div className="atd-card card mb-2" style={style}>
      <div className="card-body">
        <q>{quote}</q>
        <div>{annotation.comment}</div>
        <div>{annotation.weight} F</div>
      </div>
    </div>
  );
}

export default AnnotationCard;