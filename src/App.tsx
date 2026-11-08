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
  const [editingId, setEditingId] = useState<string | null>(null);
  
  function addAnnotation(values: AnnotationValues) {
    if (!selection) return;
    const newAnnotation: Annotation = {
      id: crypto.randomUUID(),
      start: selection.start,	
      end: selection.end,
      ...values,
    };
    

    setAnnotations([...annotations, newAnnotation]);
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  }

  function deleteAnnotation(id: string) {
    // filter builds a new array so react re-renders
    setAnnotations(annotations.filter((a) => a.id !== id));
  }

  function updateAnnotation(values: AnnotationValues) {
    // map builds a new array: the edited annotation gets the new values, all others stay.
    setAnnotations(annotations.map((a) => (a.id === editingId ? { ...a, ...values } : a)));
    setEditingId(null);
  }
  
  // annotation being edited
  const editingAnnotation = annotations.find((a) => a.id === editingId);

  
  return (
    <main>
      <h1>AnnotateEd</h1>
      <p>{sampleText.length} Zeichen</p>
      <p>Auswahl: {JSON.stringify(selection)}</p>
      <p>Bearbeiten: {JSON.stringify(editingId)}</p>
      <div className="atd-editor row">
        <div className="col-8">
          <TextView text={sampleText} annotations={annotations} categories={categories} activeId={activeId} onActivate={setActiveId} onSelect={setSelection} />
        </div>
        <div className="col-4">
        <AnnotationForm key={editingId ?? "new"} categories={categories} disabled={selection === null && editingId === null} initialValues={editingAnnotation} onSave={editingId === null ? addAnnotation : updateAnnotation} />
          {annotations.map((annotation) => (
            <AnnotationCard
              key={annotation.id}
              annotation={annotation}
              text={sampleText}
              categories={categories}
              active={activeId === annotation.id}
              onActivate={setActiveId}
              onDelete={deleteAnnotation}
              onEdit={setEditingId}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
