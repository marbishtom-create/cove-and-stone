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
const apiRoute = await readFile(
  new URL("../../api-server/src/routes/contact.ts", import.meta.url),
  "utf8",
);

test("publishes a clickable Sales email on the contact page and footer", () => {
  assert.match(theme, /email:\s*"Sales@coveandstonepools\.com"/);
  assert.match(contactPage, /mailto:\$\{THEME_CONFIG\.contact\.email\}/);
  assert.match(contactPage, /THEME_CONFIG\.contact\.email/);
  assert.match(layout, /mailto:\$\{THEME_CONFIG\.contact\.email\}/);
  assert.match(layout, /THEME_CONFIG\.contact\.email/);
});

test("submits contact inquiries through the validated internal Resend route", () => {
  assert.match(contactPage, /useSubmitContactInquiry/);
  assert.match(contactPage, /mutation\.isPending/);
  assert.match(contactPage, /status-contact-error/);
  assert.match(contactPage, /contact_inquiry_submitted/);
  assert.match(apiRoute, /SubmitContactInquiryBody\.safeParse/);
  assert.match(apiRoute, /connectors\.proxy\("resend", "\/emails"/);
  assert.match(apiRoute, /Sales@coveandstonepools\.com/);
  assert.match(apiRoute, /escapeHtml/);
  assert.match(apiRoute, /replace\(\/\[\\r\\n\]\//);
  assert.match(apiRoute, /MAX_REQUESTS_PER_WINDOW/);
  assert.match(apiRoute, /status: "sent"/);
});