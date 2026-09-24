import TextView from "./components/TextView";
import { sampleText } from "./data/sampleText";
import { categories } from "./config/categories";
import { sampleAnnotations } from "./data/sample/sampleAnnotations";
import AnnotationCard from "./components/AnnotationCard";




function App() {
  return (
    <main>
      <h1>AnnotateEd</h1>
      <p>{sampleText.length} Zeichen</p>
      <div className="atd-editor row">
        <div className="col-8">
          <TextView text={sampleText} annotations={sampleAnnotations} categories={categories} />
        </div>
        <div className="col-4">
          {sampleAnnotations.map((annotation) => (
            <AnnotationCard key={annotation.id} annotation={annotation} text={sampleText} categories={categories} />          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
