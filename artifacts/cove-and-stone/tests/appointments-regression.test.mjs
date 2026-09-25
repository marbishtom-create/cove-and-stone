import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

const [app, layout, appointmentPage, appointmentCss, layoutCtaCss, ctaElements, apiRoute, apiSpec, seoText, sitemap, themeConfig, projectDetail, waterMask] =
  await Promise.all([
    read("../src/App.tsx"),
    read("../src/components/layout/layout.tsx"),
    read("../src/pages/appointments.tsx"),
    read("../src/pages/appointments.css"),
    read("../src/components/layout/appointment-cta.css"),
    read("../src/components/layout/appointment-cta-elements.tsx"),
    read("../../api-server/src/routes/appointments.ts"),
    read("../../../lib/api-spec/openapi.yaml"),
    read("../src/config/seo-routes.json"),
    read("../public/sitemap.xml"),
    read("../src/config/theme.ts"),
    read("../src/pages/project-detail.tsx"),
    read("../public/brand/appointment-cta-water-mask.svg"),
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
  assert.match(layoutCtaCss, /border-radius:\s*9999px/);
  assert.match(layoutCtaCss, /aspect-ratio:\s*2007\s*\/\s*420/);
  assert.match(layoutCtaCss, /width:\s*min\(19\.9584rem/);
  assert.match(layoutCtaCss, /width:\s*min\(15\.12rem/);
  assert.match(projectDetail, /max-w-\[18\.27rem\]\s+sm:max-w-\[24\.948rem\]/);
  assert.match(layoutCtaCss, /layout-appointment-cta__reference-art/);
  assert.match(layoutCtaCss, /cove-cta-water-flow/);
  assert.match(layoutCtaCss, /animation:\s*cove-cta-water-flow\s+8s\s+linear\s+infinite/);
  assert.match(layoutCtaCss, /repeating-linear-gradient\(\s*0deg/);
  assert.match(layoutCtaCss, /appointment-cta-water-mask\.svg/);
  assert.match(waterMask, /M0 179/);
  assert.match(waterMask, /C1000 366 1090 363 1200 364/);
  assert.match(waterMask, /2007 412\s+L2007 420/);
  assert.match(layoutCtaCss, /layout-appointment-cta__copy-backdrop/);
  assert.match(layoutCtaCss, /layout-appointment-cta__eyebrow/);
  assert.match(layoutCtaCss, /transition-delay:\s*3s/);
  assert.match(layoutCtaCss, /width:\s*172%/);
  assert.match(layoutCtaCss, /drop-shadow\(/);
  assert.match(layoutCtaCss, /cubic-bezier\(0\.2,\s*1\.55/);
  assert.match(ctaElements, /layout-appointment-cta__duck-medallion/);
  assert.match(ctaElements, /viewBox="0 0 48 48"/);
  assert.match(ctaElements, /useId/);
  assert.match(ctaElements, /linearGradient/);
  assert.equal((ctaElements.match(/fill="#080c10"/g) ?? []).length, 2);
  assert.match(ctaElements, /M18\.7 22\.4/);
  assert.match(ctaElements, /src="\/brand\/appointment-cta-reference\.png"/);
  assert.match(ctaElements, /aria-hidden="true"/);
  assert.match(layoutCtaCss, /clip-path:\s*inset\(50%\)/);
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
  assert.match(themeConfig, /hours:\s*"By appointment: Sunday–Thursday, 9:00 AM–10:00 PM • Friday, 9:00 AM–5:00 PM • Saturday: Closed"/);
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