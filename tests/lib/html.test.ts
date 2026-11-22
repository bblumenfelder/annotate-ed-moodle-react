import { describe, expect, test } from "@jest/globals";
import { parseHtml } from "../../src/lib/html";

describe("parseHtml", () => {
    test("bold text stays an element, only the letters count", () => {
        const doc = parseHtml("<p>Platon schrieb die <strong>Politeia</strong>.</p>");

        expect(doc.text).toBe("Platon schrieb die Politeia.");
        expect(doc.nodes).toEqual([
            {
                kind: "element", tag: "p", children: [
                    { kind: "text", start: 0, end: 19 },
                    { kind: "element", tag: "strong", children: [{ kind: "text", start: 19, end: 27 }] },
                    { kind: "text", start: 27, end: 28 },
                ]
            },
        ]);
    });


    test("line breaks between table cells are no text", () => {
        const doc = parseHtml("<table>\n<tr>\n<td>Platon</td>\n<td>Aristoteles</td>\n</tr>\n</table>");

        expect(doc.text).toBe("PlatonAristoteles");
    });

    test("unknown tags disappear, scripts with their content", () => {
        const doc = parseHtml('<p>Er war <span>unzufrieden</span>.<script>alert(1)</script></p>');

        expect(doc.text).toBe("Er war unzufrieden.");
    });



    
    test("caption stays, columns of a table are no text", () => {
        const doc = parseHtml("<table><caption>Tabelle 1</caption>\n<colgroup>\n<col>\n</colgroup>\n<tbody>\n<tr>\n<td>Platon</td>\n</tr>\n</tbody>\n</table>");

        expect(doc.text).toBe("Tabelle 1Platon");
    });

});




