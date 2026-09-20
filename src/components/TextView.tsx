import type { Span } from "../types";
import { splitIntoPieces } from "../lib/segments";
import { Fragment } from "react";

interface TextViewProps {
    text: string;
    spans: Span[];
  }
  
  function TextView({ text, spans }: TextViewProps) {
    const pieces = splitIntoPieces(text, spans);
    return (
      <div className="atd-text-view">
      {pieces.map((piece) => {
        const content = text.slice(piece.start, piece.end);
        if (piece.marked) {
          return <mark key={piece.start} className="atd-mark">{content}</mark>;
        }
        return <Fragment key={piece.start}>{content}</Fragment>;
      })}
    </div>
    );
  }
  
  export default TextView;