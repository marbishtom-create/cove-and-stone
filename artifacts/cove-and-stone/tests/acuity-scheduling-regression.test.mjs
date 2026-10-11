import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { resolveAcuitySchedulingUrl } from "../src/lib/acuity-scheduling.ts";

const theme = await readFile(new URL("../src/config/theme.ts", import.meta.url), "utf8");
const contactPage = await readFile(new URL("../src/pages/contact.tsx", import.meta.url), "utf8");
const scheduler = await readFile(
  new URL("../src/components/contact/acuity-inline-scheduler.tsx", import.meta.url),
  "utf8",
);

test("keeps the Acuity scheduling URL empty until Tom pastes his link", () => {
  assert.match(theme, /acuitySchedulingUrl:\s*""/);
});

test("contact page keeps the inquiry form and only mounts booking through the scheduler", () => {
  assert.match(contactPage, /Project Inquiry/);
  assert.match(contactPage, /useSubmitContactInquiry/);
  assert.match(contactPage, /<AcuityConsultationBooking \/>/);
  assert.doesNotMatch(contactPage, /<iframe/);
});

test("scheduler is Acuity's inline embed and stays out of the page when the URL is empty", () => {
  assert.match(scheduler, /if \(!schedulingUrl\) return null/);
  assert.match(scheduler, /resolveAcuitySchedulingUrl\(THEME_CONFIG\.acuitySchedulingUrl\)/);
  assert.match(scheduler, /https:\/\/embed\.acuityscheduling\.com\/js\/embed\.js/);
  assert.match(scheduler, /<iframe/);
  assert.match(scheduler, /Book a free rendering consultation/);
  assert.match(
    scheduler,
    /Consultations are 30 minutes, virtual or at the partner showroom by appointment\./,
  );
  assert.match(scheduler, /IntersectionObserver/);
});

test("accepts Acuity scheduling page URLs and rejects everything else", () => {
  assert.equal(resolveAcuitySchedulingUrl(""), null);
  assert.equal(resolveAcuitySchedulingUrl("   "), null);
  assert.equal(resolveAcuitySchedulingUrl(undefined), null);
  assert.equal(
    resolveAcuitySchedulingUrl("https://coveandstone.as.me/"),
    "https://coveandstone.as.me/",
  );
  assert.equal(
    resolveAcuitySchedulingUrl("https://app.acuityscheduling.com/schedule.php?owner=12345"),
    "https://app.acuityscheduling.com/schedule.php?owner=12345",
  );
  assert.equal(
    resolveAcuitySchedulingUrl("https://coveandstone.squarespacescheduling.com/"),
    "https://coveandstone.squarespacescheduling.com/",
  );
  assert.equal(resolveAcuitySchedulingUrl("http://coveandstone.as.me/"), null);
  assert.equal(resolveAcuitySchedulingUrl("https://example.com/schedule"), null);
  assert.equal(resolveAcuitySchedulingUrl("javascript:alert(1)"), null);
  assert.equal(resolveAcuitySchedulingUrl("https://user:pass@coveandstone.as.me/"), null);
});
