import type { CSSProperties } from "react";
import type { Annotation, Category } from "../types";

interface AnnotationCardProps {
  annotation: Annotation;
  text: string;
  categories: Category[];
  active: boolean;
  onActivate: (id: string | null) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

function AnnotationCard({ annotation, text, categories, active, onActivate, onDelete, onEdit }: AnnotationCardProps) {
  const quote = text.slice(annotation.start, annotation.end);
  const category = categories.find((c) => c.name === annotation.category);
  const style = { "--atd-card-color": category?.color } as CSSProperties;
  const className = active ? "atd-card atd-card--active card mb-2" : "atd-card card mb-2";
  return (
    <div className={className} style={style} onMouseEnter={() => onActivate(annotation.id)} onMouseLeave={() => onActivate(null)}>
      <div className="card-body">
        <q>{quote}</q>
        <div>{annotation.comment}</div>
        <div>{annotation.weight} F</div>
        <div className="d-flex gap-2 mt-2">
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(annotation.id)}>
            Bearbeiten
          </button>
          <button type="button" className="btn btn-sm btn-outline-danger" aria-label="Löschen" onClick={() => onDelete(annotation.id)}>
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnnotationCard;