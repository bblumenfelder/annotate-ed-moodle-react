import { useState } from "react";
import TextView from "./components/TextView";
import AnnotationCard from "./components/AnnotationCard";
import AnnotationForm from "./components/AnnotationForm";
import type { Annotation, AnnotationValues, Category, Span } from "./types";

// props coming from the outside
interface EditorProps {
  text: string;
  categories: Category[];
  initialAnnotations?: Annotation[];
}

function Editor({ text, categories, initialAnnotations = [] }: EditorProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selection, setSelection] = useState<Span | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>(initialAnnotations);
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
    // a deleted annotation can't be edited any more.
    if (id === editingId) setEditingId(null);
  }

  function updateAnnotation(values: AnnotationValues) {
    // map builds a new array: the edited annotation gets the new values, all others stay.
    setAnnotations(annotations.map((a) => (a.id === editingId ? { ...a, ...values } : a)));
    setEditingId(null);
  }


  function cancelForm() {
    setEditingId(null);
    setSelection(null);
    window.getSelection()?.removeAllRanges();
  }
  
  // annotation being edited
  const editingAnnotation = annotations.find((a) => a.id === editingId);

  
  return (
      <div className="atd-editor row">
        <div className="col-8">
          <TextView text={text} annotations={annotations} categories={categories} activeId={activeId} onActivate={setActiveId} onSelect={setSelection} />

        </div>
        <div className="col-4">
        <AnnotationForm
          key={editingId ?? "new"}
          categories={categories}
          disabled={selection === null && editingId === null}
          initialValues={editingAnnotation}
          onSave={editingId === null ? addAnnotation : updateAnnotation}
          onCancel={cancelForm}
        />
          {annotations.map((annotation) => (
            <AnnotationCard
              key={annotation.id}
              annotation={annotation}
              text={text}
              categories={categories}
              active={activeId === annotation.id}
              onActivate={setActiveId}
              onDelete={deleteAnnotation}
              onEdit={setEditingId}
            />
          ))}
       </div>
      </div>
  );
}

export default Editor;