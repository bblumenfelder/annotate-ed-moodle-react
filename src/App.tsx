import TextView from "./components/TextView";
import { sampleText } from "./data/sampleText";

import type { Annotation } from "./types";

// Four annotations in the sample text. The last two overlap.
const annotations: Annotation[] = [
  { start: 31, end: 46, category: "inhalt" },
  { start: 19, end: 30, category: "grammatik" },
  { start: 641, end: 668, category: "inhalt" },
  { start: 661, end: 701, category: "ausdruck" },
];


function App() {
  return (
    <main>
      <h1>AnnotateEd</h1>
      <p>{sampleText.length} Zeichen</p>
      <TextView text={sampleText} spans={annotations} />
    </main>
  );
}

export default App;
