import { useState } from "react";
import type { AnnotationValues, Category } from "../types";


interface AnnotationFormProps {
    categories: Category[];
    disabled: boolean;
    onSave: (values: AnnotationValues) => void;
  }
  
// values of an empty form
const emptyValues: AnnotationValues = { category: "none", weight: 1, comment: "" };


function AnnotationForm({ categories, disabled, onSave }: AnnotationFormProps) {
  const [values, setValues] = useState<AnnotationValues>(emptyValues);

    // save action handler
    function handleSave() {
        onSave(values);
        setValues(emptyValues);
    }

  return (
    <div className="mb-2">
        {/* Kategorie select */}
              <select
        className="form-select mb-2"
        aria-label="Kategorie"
        value={values.category}
        onChange={(event) => setValues({ ...values, category: event.target.value })}
      >
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.title}
          </option>
        ))}
      </select>
      {/* Gewichtung slider */}
      <div className="d-flex align-items-center gap-2 mb-2">
        <input
          type="range"
          className="form-range"
          min={0}
          max={3}
          step={0.5}
          aria-label="Gewichtung"
          value={values.weight}
          onChange={(event) => setValues({ ...values, weight: Number(event.target.value) })}
        />
        <span className="text-nowrap">{values.weight} F</span>
      </div>
      <textarea
        className="form-control mb-2"
        rows={2}
        placeholder="Feedback..."
        aria-label="Kommentar"
        value={values.comment}
        onChange={(event) => setValues({ ...values, comment: event.target.value })}
      />
      <button type="button" className="btn btn-primary" disabled={disabled} onClick={handleSave}>
        Speichern
      </button>
    </div>
  );
}

export default AnnotationForm;