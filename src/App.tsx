import TextView from "./components/TextView";
import { sampleText } from "./data/sampleText";
import type { Span } from "./types";

// Three marked places in the sample text. They do not overlap yet.
const spans: Span[] = [
  { start: 31, end: 46 },
  { start: 19, end: 30 },
  { start: 641, end: 668 },
];


function App() {
  return (
    <main>
      <h1>AnnotateEd</h1>
      <p>{sampleText.length} Zeichen</p>
      <TextView text={sampleText} spans={spans} />
    </main>
  );
}

export default App;
