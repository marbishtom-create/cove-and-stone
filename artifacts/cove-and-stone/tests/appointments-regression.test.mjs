import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

const [app, layout, appointmentPage, appointmentCss, layoutCtaCss, apiRoute, apiSpec, seoText, sitemap, themeConfig] =
  await Promise.all([
    read("../src/App.tsx"),
    read("../src/components/layout/layout.tsx"),
    read("../src/pages/appointments.tsx"),
    read("../src/pages/appointments.css"),
    read("../src/components/layout/appointment-cta.css"),
    read("../../api-server/src/routes/appointments.ts"),
    read("../../../lib/api-spec/openapi.yaml"),
    read("../src/config/seo-routes.json"),
    read("../public/sitemap.xml"),
    read("../src/config/theme.ts"),
  ]);
const seo = JSON.parse(seoText);

test("registers the appointments page and combines the old CTAs into one action per layout", () => {
  assert.match(app, /import Appointments from '@\/pages\/appointments'/);
  assert.match(app, /<Route path="\/appointments\/" component={Appointments}/);
  assert.equal((layout.match(/data-testid="link-desktop-appointment-cta"/g) ?? []).length, 1);
  assert.equal((layout.match(/data-testid="link-mobile-sticky-appointment-cta"/g) ?? []).length, 1);
  assert.match(layout, /data-testid="link-desktop-appointment-cta"/);
  assert.match(layout, /data-testid="link-mobile-appointment-cta"/);
  assert.doesNotMatch(layout, /Design Consultations|Book a design consultation|href="\/financing\/"/);
  assert.match(layoutCtaCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(layoutCtaCss, /layout-appointment-cta:hover::before/);
  assert.match(layoutCtaCss, /border-radius:\s*50%/);
  assert.match(layoutCtaCss, /width:\s*min\(15\.84rem/);
  assert.match(layoutCtaCss, /width:\s*min\(12rem/);
  assert.match(layoutCtaCss, /layout-appointment-cta__stone/);
});

test("collects the required customer details and submits through the generated appointment mutation", () => {
  assert.match(appointmentPage, /useRequestAppointment/);
  assert.match(appointmentPage, /mutation\.mutate\(\s*\{\s*data:\s*values\s*\}/);
  for (const field of ["full-name", "address", "phone", "preferred-date", "preferred-time"]) {
    assert.match(appointmentPage, new RegExp(`data-testid="(?:input|select)-${field}"`));
  }
  assert.match(appointmentPage, /Array\.from\(\{ length: 15 \}/);
  assert.match(appointmentPage, /Friday appointments must finish by 5:00 PM/);
  assert.match(appointmentPage, /4:30 PM ET/);
  assert.match(appointmentPage, /We are closed on Saturdays/);
  assert.match(appointmentPage, /data-testid="button-submit-appointment"/);
  assert.match(appointmentPage, /data-testid="status-appointment-error"/);
  assert.match(appointmentPage, /data-testid="status-appointment-success"/);
  assert.match(appointmentPage, /not reserved until our team confirms/);
  assert.doesNotMatch(appointmentPage, /Monday through Friday/);
  assert.match(appointmentCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(themeConfig, /hours:\s*"Friday: Closes at 5:00 PM • Saturday: Closed"/);
});

test("validates and emails preferred appointment requests for staff confirmation", () => {
  assert.match(apiSpec, /\/appointments\/request:/);
  assert.match(apiSpec, /preferredTime:[\s\S]*?pattern:[\s\S]*?17:00/);
  assert.match(apiRoute, /RequestAppointmentBody\.safeParse/);
  assert.match(apiRoute, /preferredDateDayOfWeek === 6/);
  assert.match(apiRoute, /preferredDateDayOfWeek === 5 && request\.preferredTime === "17:00"/);
  assert.match(apiRoute, /connectors\.proxy\("resend", "\/emails"/);
  assert.match(apiRoute, /INTERNAL_RECIPIENT/);
  assert.match(apiRoute, /providerMessage\.toLowerCase\(\)\.includes\("domain"\)/);
  assert.match(apiRoute, /providerMessage\.toLowerCase\(\)\.includes\("not verified"\)/);
  assert.match(apiRoute, /res\.status\(202\)\.json\(RequestAppointmentResponse\.parse\(\{ status: "requested" \}\)\)/);
  assert.match(apiRoute, /not a confirmed or reserved appointment/);
  assert.match(apiRoute, /MAX_REQUESTS_PER_WINDOW/);
});

test("includes unique search metadata and sitemap coverage for both requested pages", () => {
  for (const path of ["/appointments", "/projects/ongoing-construction"]) {
    const page = seo.pages[path];
    assert.ok(page, `${path} must have SEO metadata`);
    assert.ok(page.description.length >= 150 && page.description.length <= 160, `${path} description length: ${page.description.length}`);
  }
  assert.match(sitemap, /<loc>https:\/\/coveandstonepools\.com\/appointments\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/coveandstonepools\.com\/projects\/ongoing-construction\/<\/loc>/);
});