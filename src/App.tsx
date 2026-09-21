import TextView from "./components/TextView";
import { sampleText } from "./data/sampleText";
import type { Span } from "./types";

// Four marked places in the sample text. The last two overlap.
const spans: Span[] = [
  { start: 31, end: 46 },
  { start: 19, end: 30 },
  { start: 641, end: 668 },
  { start: 661, end: 701 },
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
