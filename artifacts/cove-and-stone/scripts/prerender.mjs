import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const artifactRoot = path.resolve(scriptDirectory, "..");
const outputRoot = path.join(artifactRoot, "dist", "public");
const templatePath = path.join(outputRoot, "index.html");
const sitemapPath = path.join(artifactRoot, "public", "sitemap.xml");
const routeDataPath = path.join(
  artifactRoot,
  "src",
  "config",
  "seo-routes.json",
);

const SITE_URL = "https://coveandstonepools.com";
const SITE_NAME = "Cove & Stone Pools";
const SITE_IMAGE = `${SITE_URL}/brand/cove-and-stone-approved.png`;
const DEFAULT_DESCRIPTION =
  "Jacksonville and Ponte Vedra architectural outdoor-living design-build house specializing in custom pools, spas, and complete backyard environments.";
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const SERVICE_AREA_NAMES = [
  "Jacksonville",
  "Ponte Vedra Beach",
  "Nocatee",
  "St. Johns",
  "Atlantic Beach",
  "Jacksonville Beach",
  "Neptune Beach",
];

const routeData = JSON.parse(await readFile(routeDataPath, "utf8"));
const template = await readFile(templatePath, "utf8");
const sitemap = await readFile(sitemapPath, "utf8");

function absoluteUrl(pathname = "/") {
  const normalizedPath =
    pathname === "/" ? "" : `/${pathname.replace(/^\/+/, "")}`;
  return `${SITE_URL}${normalizedPath}`;
}

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
      description:
        "Explore a Cove & Stone pool and outdoor-living project direction for Northeast Florida.",
    };
  }

  if (pathname.startsWith("/locations/")) {
    const slug = pathname.split("/")[2] ?? "";
    const location = routeData.locationNames[slug] ?? titleFromSlug(slug);
    return {
      title: `${location} Pool Design & Outdoor Living | Cove & Stone`,
      description: `Explore Cove & Stone custom pools and complete outdoor-living design for ${location} and Northeast Florida.`,
      service: {
        name: `${location} Pool & Outdoor Living Design`,
        serviceType: "Custom pool and outdoor-living design-build",
      },
    };
  }

  return {
    title: `${SITE_NAME} | Jacksonville Outdoor Living`,
    description: DEFAULT_DESCRIPTION,
  };
}

function businessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: SITE_IMAGE,
    image: SITE_IMAGE,
    description:
      "Luxury custom pools and complete outdoor-living design-build for Jacksonville and Northeast Florida.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7662 Philips Hwy, Unit 32",
      addressLocality: "Jacksonville",
      addressRegion: "FL",
      postalCode: "32256",
      addressCountry: "US",
    },
    areaServed: SERVICE_AREA_NAMES,
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    publisher: {
      "@id": BUSINESS_ID,
    },
  };
}

function breadcrumbSchema(pathname, seo) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
  ];

  if (pathname.startsWith("/projects/")) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: absoluteUrl("/projects"),
    });
  }

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: seo.title.split(" | ")[0],
    item: absoluteUrl(pathname),
  });

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(pathname)}#breadcrumb`,
    itemListElement: items,
  };
}

function serviceSchema(pathname, service) {
  const isLocation = pathname.startsWith("/locations/");
  const location = isLocation
    ? routeData.locationNames[pathname.split("/")[2] ?? ""]
    : undefined;

  return {
    "@type": "Service",
    "@id": `${absoluteUrl(pathname)}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: getRouteSeo(pathname).description,
    provider: {
      "@id": BUSINESS_ID,
    },
    areaServed: location ?? SERVICE_AREA_NAMES,
  };
}

function buildStructuredData(pathname, seo) {
  const graph = [businessSchema(), websiteSchema()];

  if (pathname !== "/") {
    graph.push(breadcrumbSchema(pathname, seo));
  }

  if (seo.service) {
    graph.push(serviceSchema(pathname, seo.service));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function replaceOrInsert(html, pattern, replacement) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html.replace("</head>", `    ${replacement}\n  </head>`);
}

function renderRouteHtml(pathname) {
  const seo = getRouteSeo(pathname);
  const canonicalUrl = absoluteUrl(pathname);
  const structuredData = JSON.stringify(buildStructuredData(pathname, seo), null, 2)
    .replaceAll("</", "<\\/");

  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(seo.title)}</title>`,
  );
  html = replaceOrInsert(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
  );
  html = replaceOrInsert(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );

  const metaTags = [
    [
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    ],
    [
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    ],
    [
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    ],
    [
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    ],
    [
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    ],
  ];

  for (const [pattern, replacement] of metaTags) {
    html = replaceOrInsert(html, pattern, replacement);
  }

  html = replaceOrInsert(
    html,
    /<script id="site-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="site-structured-data" type="application/ld+json">\n      ${structuredData}\n    </script>`,
  );

  return html;
}

const routePaths = [
  ...sitemap.matchAll(/<loc>https:\/\/coveandstonepools\.com([^<]*)<\/loc>/g),
].map((match) => match[1] || "/");

if (!routePaths.includes("/")) {
  routePaths.unshift("/");
}

for (const pathname of [...new Set(routePaths)]) {
  const routeDirectory =
    pathname === "/" ? outputRoot : path.join(outputRoot, pathname.slice(1));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(
    path.join(routeDirectory, "index.html"),
    renderRouteHtml(pathname),
    "utf8",
  );
}

console.log(
  `Prerendered ${new Set(routePaths).size} public routes to ${path.relative(
    artifactRoot,
    outputRoot,
  )}.`,
);