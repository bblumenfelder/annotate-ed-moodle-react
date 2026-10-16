import TextView from "./components/TextView";
import { useState } from "react";
import { sampleText } from "./data/sampleText";
import { categories } from "./config/categories";
import { sampleAnnotations } from "./data/sample/sampleAnnotations";
import AnnotationCard from "./components/AnnotationCard";
import type { Span } from "./types";



function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selection, setSelection] = useState<Span | null>(null);
  return (
    <main>
      <h1>AnnotateEd</h1>
      <p>{sampleText.length} Zeichen</p>
      <p>Auswahl: {JSON.stringify(selection)}</p>
      <div className="atd-editor row">
        <div className="col-8">
          <TextView text={sampleText} annotations={sampleAnnotations} categories={categories} activeId={activeId} onActivate={setActiveId} onSelect={setSelection} />
        </div>
        <div className="col-4">
        {sampleAnnotations.map((annotation) => (
            <AnnotationCard
              key={annotation.id}
              annotation={annotation}
              text={sampleText}
              categories={categories}
              active={activeId === annotation.id}
              onActivate={setActiveId}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
