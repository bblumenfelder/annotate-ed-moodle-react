import type { Annotation, Category } from "../types";
import { splitIntoSegments } from "../lib/segments";
import { Fragment } from "react";
import type { CSSProperties } from "react";

interface TextViewProps {
  text: string;
  annotations: Annotation[];
  categories: Category[];
  activeId: string | null;
  onActivate: (id: string | null) => void;

}

function TextView({ text, annotations, categories, activeId, onActivate }: TextViewProps) {
  const segments = splitIntoSegments(text, annotations);
  return (
    <div className="atd-text-view">
      {segments.map((segment) => {
        const content = text.slice(segment.start, segment.end);
        if (segment.spans.length > 0) {
          // The active annotation decides the color, otherwise the last one.
          const last = segment.spans[segment.spans.length - 1];
          const shown = segment.spans.find((a) => a.id === activeId) ?? last;
          const category = categories.find((c) => c.name === shown.category);
          const style = {
            "--atd-mark-color": category?.color,
            // 20% per annotation, at most 100%.
            "--atd-mark-alpha": `${Math.min(20 * segment.spans.length, 100)}%`,
          } as CSSProperties;
          // Active if the shown annotation is the active one.
          const active = shown.id === activeId;
          const className = active ? "atd-mark atd-mark--active" : "atd-mark";
          return (
            <mark
              key={segment.start}
              className={className}
              style={style}
              onMouseEnter={() => onActivate(shown.id)}
              onMouseLeave={() => onActivate(null)}
            >
              {content}
            </mark>
          );
        }
        return <Fragment key={segment.start}>{content}</Fragment>;
      })}
    </div>
  );
}

export default TextView;