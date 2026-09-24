import type { Annotation } from "../types";

interface AnnotationCardProps {
  annotation: Annotation;
  text: string;
}

function AnnotationCard({ annotation, text }: AnnotationCardProps) {
  const quote = text.slice(annotation.start, annotation.end);
  return (
    <div className="card mb-2">
      <div className="card-body">
        <q>{quote}</q>
        <div>{annotation.comment}</div>
        <div>{annotation.weight} F</div>
      </div>
    </div>
  );
}

export default AnnotationCard;