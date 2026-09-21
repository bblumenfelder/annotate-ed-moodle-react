import type { Span } from "../types";
import { splitIntoSegments } from "../lib/segments";
import { Fragment } from "react";
import type { CSSProperties } from "react";

interface TextViewProps {
    text: string;
    spans: Span[];
  }
  
  function TextView({ text, spans }: TextViewProps) {
    const segments = splitIntoSegments(text, spans);
    return (
      <div className="atd-text-view">
        {segments.map((segment) => {
          const content = text.slice(segment.start, segment.end);
          if (segment.spans.length > 0) {
            // For now every mark gets the same color.
            const style = { "--atd-mark-color": "#FF9800" } as CSSProperties;
            return <mark key={segment.start} className="atd-mark" style={style}>{content}</mark>;          }
          return <Fragment key={segment.start}>{content}</Fragment>;
        })}
      </div>
    );
  }
  
  export default TextView;