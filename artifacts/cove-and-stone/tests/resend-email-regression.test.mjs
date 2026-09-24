import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const apiRoute = await readFile(
  new URL("../../api-server/src/routes/design-concepts.ts", import.meta.url),
  "utf8",
);

test("turns an unverified Resend sender response into a safe Sales fallback", () => {
  assert.match(apiRoute, /response\.status === 403/);
  assert.match(apiRoute, /providerMessage\.toLowerCase\(\)\.includes\("sender domain"\)/);
  assert.match(apiRoute, /providerMessage\.toLowerCase\(\)\.includes\("not verified"\)/);
  assert.match(
    apiRoute,
    /The email service is not ready to send this request\. Please contact Sales directly at Sales@coveandstonepools\.com\./,
  );
  assert.match(apiRoute, /res\.status\(502\)\.json\(\{ message: UNVERIFIED_SENDER_MESSAGE \}\)/);
  assert.match(apiRoute, /req\.log\.error\(\s*\{ providerStatus: response\.status, providerMessage \}/s);
  assert.doesNotMatch(apiRoute, /res\.status\(403\)/);
});