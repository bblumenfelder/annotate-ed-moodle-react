import Editor from "./Editor";
import { sampleText } from "./data/sampleText";
import { categories } from "./config/categories";
import { sampleAnnotations } from "./data/sample/sampleAnnotations";

// dev page
function App() {
  return (
    <main>
      <h1>AnnotateEd</h1>
      <p>{sampleText.length} Zeichen</p>
      <Editor text={sampleText} categories={categories} initialAnnotations={sampleAnnotations} />
    </main>
  );
}

export default App;