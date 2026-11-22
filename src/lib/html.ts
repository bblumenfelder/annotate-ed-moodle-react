// One node of the submission: a piece of text or an element with child nodes.
export type DocNode =
  | { kind: "text"; start: number; end: number }
  | { kind: "element"; tag: string; children: DocNode[] };

// The whole submission: all its text and the tree that shows it.
export interface ParsedDoc {
  text: string;
  nodes: DocNode[];
}



// Tags that the editor shows. All other tags disappear, their content stays.
const allowedTags = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "s", "sub", "sup", "blockquote",
  "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li",
  "table", "caption", "thead", "tbody", "tfoot", "tr", "th", "td", "dl", "dt", "dd",
]);
// Tags whose content is never shown.
const droppedTags = new Set(["script", "style", "template"]);
// Tags that may not contain text directly, only other elements.
// moodle inserts line breaks between table cells and list items in order to make the HTML more readable, 
// but those line breaks are not part of the students text.
const containerTags = new Set(["table", "thead", "tbody", "tfoot", "tr", "ul", "ol", "dl"]);



/**
 * Turns the child nodes of a browser node into nodes of our own tree, that
 * can be properly rendered for AnnotateEd. This is basically a read-only version
 * of ProseMirrors Schema.
 *
 * Input: a node of the document that DOMParser built from the submissions HTML,
 * for example the <body> of
 *   <p>Platon schrieb die <strong>Politeia</strong>.</p>
 *
 * Output: one DocNode for every child that is kept, in the original order.
 * Text nodes hold no letters, only where their letters stand in doc.text:
 * 
 *   [{ kind: "element", tag: "p", children: [
 *     { kind: "text", start: 0, end: 19 },
 *     { kind: "element", tag: "strong", children: [{ kind: "text", start: 19, end: 27 }] },
 *     { kind: "text", start: 27, end: 28 },
 *   ] }]
 *
 * Rules:
 * - Allowed tags become elements, other tags disappear but keep their content.
 * - Dropped tags (script, style, template) disappear with their content.
 * - Line breaks that would land directly in a table or list tag are skipped.
 *
 * @param parent The browser node whose children are converted.
 * @param doc The result so far; doc.text grows while the function runs.
 * @returns The converted children of parent.
 */
function convert(parent: Node, doc: ParsedDoc, keptTag: string): DocNode[] {
  const nodes: DocNode[] = [];
  for (const child of parent.childNodes) {
    if (child instanceof Text) {
      // Line breaks between table cells or list items are not the student's text.
      if (containerTags.has(keptTag) && child.data.trim() === "") continue;
      nodes.push({ kind: "text", start: doc.text.length, end: doc.text.length + child.data.length });
      doc.text += child.data;
    } else if (child instanceof Element) {
      const tag = child.tagName.toLowerCase();
      if (droppedTags.has(tag)) continue;
      const children = convert(child, doc, allowedTags.has(tag) ? tag : keptTag);
      if (allowedTags.has(tag)) nodes.push({ kind: "element", tag, children });
      else nodes.push(...children);
    }
  }
  return nodes;
}


// Reads the HTML of a submission. The positions of all annotations count in doc.text.
export function parseHtml(html: string): ParsedDoc {
  const body = new DOMParser().parseFromString(html, "text/html").body;
  const doc: ParsedDoc = { text: "", nodes: [] };
  doc.nodes = convert(body, doc, "body");
  return doc;
}