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
const projectDetail = await readFile(
  new URL("../src/pages/project-detail.tsx", import.meta.url),
  "utf8",
);
const locationPage = await readFile(
  new URL("../src/pages/location.tsx", import.meta.url),
  "utf8",
);
const appointmentsPage = await readFile(
  new URL("../src/pages/appointments.tsx", import.meta.url),
  "utf8",
);
const apiRoute = await readFile(
  new URL("../../api-server/src/routes/contact.ts", import.meta.url),
  "utf8",
);

test("publishes a clickable Sales email on the contact page and footer", () => {
  assert.match(theme, /email:\s*"Sales@coveandstonepools\.com"/);
  assert.match(theme, /phone:\s*"\(904\) 63-POOLS"/);
  assert.match(theme, /phoneHref:\s*"tel:\+19046376657"/);
  assert.doesNotMatch(theme, /954-774-6492|19547746492/);
  assert.match(contactPage, /mailto:\$\{THEME_CONFIG\.contact\.email\}/);
  assert.match(contactPage, /THEME_CONFIG\.contact\.email/);
  assert.match(contactPage, /href=\{THEME_CONFIG\.contact\.phoneHref\}/);
  assert.match(contactPage, /contact_phone_clicked/);
  assert.match(layout, /mailto:\$\{THEME_CONFIG\.contact\.email\}/);
  assert.match(layout, /THEME_CONFIG\.contact\.email/);
  assert.match(layout, /contact_email_clicked/);
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

test("tracks appointment calls to action across the site", () => {
  assert.match(layout, /appointment_cta_clicked/);
  assert.match(projectDetail, /appointment_cta_clicked/);
  assert.match(locationPage, /appointment_cta_clicked/);
  assert.match(appointmentsPage, /appointment_request_submitted/);
});