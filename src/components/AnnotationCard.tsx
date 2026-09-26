import type { CSSProperties } from "react";
import type { Annotation, Category } from "../types";

interface AnnotationCardProps {
  annotation: Annotation;
  text: string;
  categories: Category[];
  onActivate: (id: string) => void;
}

function AnnotationCard({ annotation, text, categories, onActivate }: AnnotationCardProps) {
  const quote = text.slice(annotation.start, annotation.end);
  const category = categories.find((c) => c.name === annotation.category);
  const style = { "--atd-card-color": category?.color } as CSSProperties;
  return (
    <div className="atd-card card mb-2" style={style} onMouseEnter={() => onActivate(annotation.id)} onMouseLeave={() => onActivate(null)}>
      <div className="card-body">
        <q>{quote}</q>
        <div>{annotation.comment}</div>
        <div>{annotation.weight} F</div>
      </div>
    </div>
  );
}

export default AnnotationCard;