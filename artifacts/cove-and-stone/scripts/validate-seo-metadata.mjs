import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const artifactRoot = path.resolve(scriptDirectory, "..");
const routeData = JSON.parse(
  await readFile(path.join(artifactRoot, "src", "config", "seo-routes.json"), "utf8"),
);
const sitemap = await readFile(
  path.join(artifactRoot, "public", "sitemap.xml"),
  "utf8",
);
const outputRoot = path.join(artifactRoot, "dist", "public");
const siteUrl = "https://coveandstonepools.com";

const routes = [
  ...new Set(
    [...sitemap.matchAll(/<loc>https:\/\/coveandstonepools\.com([^<]*)<\/loc>/g)].map(
      (match) => match[1] || "/",
    ),
  ),
];

function canonicalPathname(pathname = "/") {
  const pathOnly = pathname.split(/[?#]/)[0] || "/";
  if (pathOnly === "/") {
    return "/";
  }

  return `/${pathOnly.replace(/^\/+|\/+$/g, "")}/`;
}

function routeKey(pathname) {
  const canonical = canonicalPathname(pathname);
  return canonical === "/" ? "/" : canonical.slice(0, -1);
}

function absoluteUrl(pathname = "/") {
  return `${siteUrl}${canonicalPathname(pathname)}`;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getRouteSeo(pathname) {
  const key = routeKey(pathname);

  if (routeData.pages[key]) {
    return routeData.pages[key];
  }

  if (key.startsWith("/projects/") && key.split("/").length === 3) {
    const slug = key.split("/")[2] ?? "";
    const projectName = routeData.projectNames[slug];
    if (!projectName) {
      throw new Error(`Unknown project route in sitemap: ${pathname}`);
    }

    return {
      title: `${projectName} | Cove & Stone`,
      description: `Explore the ${projectName} pool and outdoor-living design direction for Northeast Florida.`,
    };
  }

  if (key.startsWith("/locations/") && key.split("/").length === 3) {
    const slug = key.split("/")[2] ?? "";
    const location = routeData.locationNames[slug];
    if (!location) {
      throw new Error(`Unknown location route in sitemap: ${pathname}`);
    }

    return {
      title: `${location} Pool Design & Outdoor Living | Cove & Stone`,
      description: `Explore Cove & Stone custom pools and complete outdoor-living design for ${location} and Northeast Florida.`,
    };
  }

  return key === "/" ? {
    title: "Cove & Stone Pools | Jacksonville Outdoor Living",
    description: "Jacksonville and Northeast Florida pool and outdoor-living design.",
  } : {
    title: "Page not found | Cove & Stone Pools",
    description:
      "The page you requested could not be found on the Cove & Stone Pools website.",
  };
}

const metadata = routes.map((pathname) => ({
  pathname: canonicalPathname(pathname),
  ...getRouteSeo(pathname),
}));

for (const pathname of routes) {
  if (canonicalPathname(pathname) !== pathname) {
    throw new Error(`Sitemap URL must use a trailing slash: ${pathname}`);
  }
}

for (const field of ["title", "description"]) {
  const seen = new Map();

  for (const route of metadata) {
    if (!route[field]?.trim()) {
      throw new Error(`Missing ${field} for ${route.pathname}`);
    }

    const paths = seen.get(route[field]) ?? [];
    paths.push(route.pathname);
    seen.set(route[field], paths);
  }

  const duplicates = [...seen.entries()].filter(([, paths]) => paths.length > 1);
  if (duplicates.length) {
    const details = duplicates
      .map(([value, paths]) => `${paths.join(", ")} => ${value}`)
      .join("\n");
    throw new Error(`Duplicate ${field} values found:\n${details}`);
  }
}

for (const route of metadata) {
  const routeFile =
    route.pathname === "/"
      ? path.join(outputRoot, "index.html")
      : path.join(outputRoot, route.pathname.slice(1), "index.html");
  const html = await readFile(routeFile, "utf8");
  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = decodeHtml(
    html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "",
  );
  const canonical = html.match(
    /<link rel="canonical" href="([^"]*)" \/>/i,
  )?.[1];
  const openGraphUrl = html.match(
    /<meta property="og:url" content="([^"]*)"/i,
  )?.[1];
  const structuredDataText = html.match(
    /<script id="site-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/i,
  )?.[1];

  if (title !== route.title) {
    throw new Error(`Generated title mismatch for ${route.pathname}`);
  }
  if (description !== route.description) {
    throw new Error(`Generated description mismatch for ${route.pathname}`);
  }
  if (canonical !== absoluteUrl(route.pathname)) {
    throw new Error(`Generated canonical mismatch for ${route.pathname}`);
  }
  if (openGraphUrl !== absoluteUrl(route.pathname)) {
    throw new Error(`Generated Open Graph URL mismatch for ${route.pathname}`);
  }

  let structuredData;
  try {
    structuredData = JSON.parse(structuredDataText ?? "");
  } catch {
    throw new Error(`Generated structured data is not valid JSON for ${route.pathname}`);
  }

  if (route.isNotFound) {
    throw new Error(`An unknown route appeared in the sitemap: ${route.pathname}`);
  }
  if (!structuredData["@graph"]?.length) {
    throw new Error(`Generated structured data is empty for ${route.pathname}`);
  }
}

console.log(`Validated unique titles and descriptions for ${routes.length} sitemap routes.`);