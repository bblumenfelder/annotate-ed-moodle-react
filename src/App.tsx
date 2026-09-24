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
      <TextView text={sampleText} annotations={sampleAnnotations} categories={categories} />
      {sampleAnnotations.map((annotation) => (
        <AnnotationCard key={annotation.id} annotation={annotation} text={sampleText} />
      ))}
    </main>
  );
}

export default App;
