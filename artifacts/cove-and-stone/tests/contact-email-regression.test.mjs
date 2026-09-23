import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const theme = await readFile(
  new URL("../src/config/theme.ts", import.meta.url),
  "utf8",
);
const contactPage = await readFile(
  new URL("../src/pages/contact.tsx", import.meta.url),
  "utf8",
);
const layout = await readFile(
  new URL("../src/components/layout/layout.tsx", import.meta.url),
  "utf8",
);

test("publishes a clickable Sales email on the contact page and footer", () => {
  assert.match(theme, /email:\s*"Sales@coveandstonepools\.com"/);
  assert.match(contactPage, /mailto:\$\{THEME_CONFIG\.contact\.email\}/);
  assert.match(contactPage, /THEME_CONFIG\.contact\.email/);
  assert.match(layout, /mailto:\$\{THEME_CONFIG\.contact\.email\}/);
  assert.match(layout, /THEME_CONFIG\.contact\.email/);
});