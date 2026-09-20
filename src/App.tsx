import TextView from "./components/TextView";
import { sampleText } from "./data/sampleText";
function App() {
  return (
    <main>
      <h1>AnnotateEd</h1>
      <p>{sampleText.length} Zeichen</p>
      <TextView text={sampleText} />
    </main>
  );
}

export default App;
