import { sampleText } from "./data/sampleText";
function App() {
  return (
    <main>
      <h1>AnnotateEd</h1>
      <p>{sampleText.length} Zeichen</p>
      <p>{sampleText}</p>    </main>
  );
}

export default App;
