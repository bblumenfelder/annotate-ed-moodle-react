// Copies the editor core into the Moodle plugin, where Moodle's own build picks it up.
import { cpSync } from "node:fs";

const plugin = "../moodle/moodle/public/mod/assign/feedback/annotateed";
const target = `${plugin}/js/esm/src`;

for (const file of ["Editor.tsx", "types.ts"]) {
  cpSync(`src/${file}`, `${target}/${file}`);
}
for (const folder of ["components", "lib"]) {
  cpSync(`src/${folder}`, `${target}/${folder}`, { recursive: true });
}
cpSync("src/annotateed.css", `${plugin}/styles.css`);
console.log(`Copied the editor to ${target}`);