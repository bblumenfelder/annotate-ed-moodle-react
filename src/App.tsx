import TextView from "./components/TextView";
import { useState } from "react";
import { sampleText } from "./data/sampleText";
import { categories } from "./config/categories";
import { sampleAnnotations } from "./data/sample/sampleAnnotations";
import AnnotationCard from "./components/AnnotationCard";
import AnnotationForm from "./components/AnnotationForm";
import type { Annotation, AnnotationValues, Span } from "./types";


function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selection, setSelection] = useState<Span | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>(sampleAnnotations);

  function addAnnotation(values: AnnotationValues) {
    if (!selection) return;
    const newAnnotation: Annotation = {
      id: crypto.randomUUID(),
      start: selection.start,	
      end: selection.end,
      ...values,
    };
    // A new array instead of push so react re-renders.
    setAnnotations([...annotations, newAnnotation]);
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  }

  return (
    <main>
      <h1>AnnotateEd</h1>
      <p>{sampleText.length} Zeichen</p>
      <p>Auswahl: {JSON.stringify(selection)}</p>
      <div className="atd-editor row">
        <div className="col-8">
          <TextView text={sampleText} annotations={annotations} categories={categories} activeId={activeId} onActivate={setActiveId} onSelect={setSelection} />
        </div>
        <div className="col-4">
        <AnnotationForm categories={categories} disabled={selection === null} onSave={addAnnotation} />
          {annotations.map((annotation) => (
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
