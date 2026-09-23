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

const routes = [
  ...new Set(
    [...sitemap.matchAll(/<loc>https:\/\/coveandstonepools\.com([^<]*)<\/loc>/g)].map(
      (match) => match[1] || "/",
    ),
  ),
];

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getRouteSeo(pathname) {
  if (routeData.pages[pathname]) {
    return routeData.pages[pathname];
  }

  if (pathname.startsWith("/projects/")) {
    const slug = pathname.split("/")[2] ?? "project";
    const projectName = routeData.projectNames[slug] ?? titleFromSlug(slug);
    return {
      title: `${projectName} | Cove & Stone`,
      description: `Explore the ${projectName} pool and outdoor-living design direction for Northeast Florida.`,
    };
  }

  if (pathname.startsWith("/locations/")) {
    const slug = pathname.split("/")[2] ?? "";
    const location = routeData.locationNames[slug] ?? titleFromSlug(slug);
    return {
      title: `${location} Pool Design & Outdoor Living | Cove & Stone`,
      description: `Explore Cove & Stone custom pools and complete outdoor-living design for ${location} and Northeast Florida.`,
    };
  }

  return {
    title: "Cove & Stone Pools | Jacksonville Outdoor Living",
    description: "Jacksonville and Northeast Florida pool and outdoor-living design.",
  };
}

const metadata = routes.map((pathname) => ({
  pathname,
  ...getRouteSeo(pathname),
}));

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

console.log(`Validated unique titles and descriptions for ${routes.length} sitemap routes.`);