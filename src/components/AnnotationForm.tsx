import { useState } from "react";
import type { AnnotationValues } from "../types";


interface AnnotationFormProps {
    disabled: boolean;
    onSave: (values: AnnotationValues) => void;
  }
  

function AnnotationForm({ disabled, onSave }: AnnotationFormProps) {
  const [values, setValues] = useState<AnnotationValues>({ category: "none", weight: 1, comment: "" });

  return (
    <div className="mb-2">
      <textarea
        className="form-control mb-2"
        rows={2}
        placeholder="Feedback..."
        aria-label="Kommentar"
        value={values.comment}
        onChange={(event) => setValues({ ...values, comment: event.target.value })}
      />
      <button type="button" className="btn btn-primary" disabled={disabled} onClick={() => onSave(values)}>
        Speichern
      </button>
    </div>
  );
}

export default AnnotationForm;