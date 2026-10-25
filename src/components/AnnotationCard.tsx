import type { CSSProperties } from "react";
import type { Annotation, Category } from "../types";

interface AnnotationCardProps {
  annotation: Annotation;
  text: string;
  categories: Category[];
  active: boolean;
  onActivate: (id: string | null) => void;
  onDelete: (id: string) => void;
}

function AnnotationCard({ annotation, text, categories, active, onActivate, onDelete }: AnnotationCardProps) {
  const quote = text.slice(annotation.start, annotation.end);
  const category = categories.find((c) => c.name === annotation.category);
  const style = { "--atd-card-color": category?.color } as CSSProperties;
  const className = active ? "atd-card atd-card--active card mb-2" : "atd-card card mb-2";
  return (
    <div className={className} style={style} onMouseEnter={() => onActivate(annotation.id)} onMouseLeave={() => onActivate(null)}>
      <div className="card-body">
        <q>{quote}</q>
        <details><summary>Kommentar</summary>{annotation.comment}</details>
        <div>{annotation.weight} F</div>
        <button type="button" className="btn btn-sm btn-outline-danger mt-2" onClick={() => onDelete(annotation.id)}>
          x
        </button>
      </div>
    </div>
  );
}

export default AnnotationCard;