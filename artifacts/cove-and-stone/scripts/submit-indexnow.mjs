import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const artifactRoot = path.resolve(scriptDirectory, "..");
const sitemapPath = path.join(artifactRoot, "public", "sitemap.xml");
const keyFileName = "ad340e9588e21cb0ab44dc2381cf2388.txt";
const keyPath = path.join(artifactRoot, "public", keyFileName);
const siteUrl = "https://coveandstonepools.com";
const indexNowEndpoint = "https://api.indexnow.org/indexnow";

const args = new Set(process.argv.slice(2));
const shouldSubmit = args.has("--submit");
const sinceArgument = [...args].find((argument) => argument.startsWith("--since="));
const since = sinceArgument?.slice("--since=".length);

if (since && !/^\d{4}-\d{2}-\d{2}$/.test(since)) {
  throw new Error("--since must use YYYY-MM-DD format.");
}

const sitemap = await readFile(sitemapPath, "utf8");
const key = (await readFile(keyPath, "utf8")).trim();
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
  const block = match[1];
  return {
    loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim(),
    lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim(),
  };
});

const excludedPathPattern =
  /(^|\/)(?:admin|api|account|dashboard|login|private|privacy|terms|legal)(?:\/|$)/i;
const assetPattern =
  /\.(?:avif|css|gif|ico|jpe?g|js|json|map|png|svg|webp|xml|woff2?)(?:$|\?)/i;

function normalizeCanonicalUrl(rawUrl) {
  let parsed;

  try {
    parsed = new URL(rawUrl);
  } catch {
    return null;
  }

  if (parsed.origin !== siteUrl || parsed.search || parsed.hash) {
    return null;
  }

  const normalizedPath =
    parsed.pathname === "/"
      ? "/"
      : `/${parsed.pathname.replace(/^\/+|\/+$/g, "")}`;

  if (
    excludedPathPattern.test(normalizedPath) ||
    assetPattern.test(normalizedPath)
  ) {
    return null;
  }

  return `${siteUrl}${normalizedPath}`;
}

const canonicalUrls = [
  ...new Set(
    entries
      .filter((entry) => !since || (entry.lastmod && entry.lastmod >= since))
      .map((entry) => entry.loc && normalizeCanonicalUrl(entry.loc))
      .filter(Boolean),
  ),
];

if (!canonicalUrls.length) {
  throw new Error("No canonical public sitemap URLs matched the requested filter.");
}

const payload = {
  host: new URL(siteUrl).hostname,
  key,
  keyLocation: `${siteUrl}/${keyFileName}`,
  urlList: canonicalUrls,
};

if (!shouldSubmit) {
  console.log("IndexNow dry run. No request was sent.");
  console.log(JSON.stringify({ endpoint: indexNowEndpoint, ...payload }, null, 2));
  console.log("Use --submit only after the published sitemap and key file are live.");
  process.exit(0);
}

const response = await fetch(indexNowEndpoint, {
  method: "POST",
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const responseText = await response.text();
  throw new Error(
    `IndexNow submission failed with HTTP ${response.status}: ${responseText}`,
  );
}

console.log(
  `Submitted ${canonicalUrls.length} canonical public URLs to IndexNow.`,
);