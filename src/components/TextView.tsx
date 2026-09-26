import type { Annotation, Category } from "../types";
import { splitIntoSegments } from "../lib/segments";
import { Fragment } from "react";
import type { CSSProperties } from "react";

interface TextViewProps {
    text: string;
    annotations: Annotation[];
    categories: Category[];
    activeId: string | null;

  }
  
  function TextView({ text, annotations, categories, activeId }: TextViewProps) {
    const segments = splitIntoSegments(text, annotations);
    return (
      <div className="atd-text-view">
        {segments.map((segment) => {
          const content = text.slice(segment.start, segment.end);
          if (segment.spans.length > 0) {
              // The last annotation of the segment decides the color.
              const last = segment.spans[segment.spans.length - 1];
              const category = categories.find((c) => c.name === last.category);
              const style = {
                "--atd-mark-color": category?.color,
                // 20% per annotation, at most 100%.
                "--atd-mark-alpha": `${Math.min(20 * segment.spans.length, 100)}%`,
              } as CSSProperties;            
                        // Active if one of the segment's annotations is the active one.
          const active = segment.spans.some((a) => a.id === activeId);
          const className = active ? "atd-mark atd-mark--active" : "atd-mark";
          return <mark key={segment.start} className={className} style={style}>{content}</mark>;
        }
          return <Fragment key={segment.start}>{content}</Fragment>;
        })}
      </div>
    );
  }
  
  export default TextView;