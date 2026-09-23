import routeData from "./seo-routes.json";
import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/config/site";

type ServiceDefinition = {
  name: string;
  serviceType: string;
};

export type RouteSeo = {
  title: string;
  description: string;
  service?: ServiceDefinition;
};

const data = routeData as {
  pages: Record<string, RouteSeo>;
  projectNames: Record<string, string>;
  locationNames: Record<string, string>;
};

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

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getRouteSeo(pathname: string): RouteSeo {
  if (data.pages[pathname]) {
    return data.pages[pathname];
  }

  if (pathname.startsWith("/projects/")) {
    const slug = pathname.split("/")[2] ?? "project";
    const projectName = data.projectNames[slug] ?? titleFromSlug(slug);
    return {
      title: `${projectName} | Cove & Stone`,
      description:
        "Explore a Cove & Stone pool and outdoor-living project direction for Northeast Florida.",
    };
  }

  if (pathname.startsWith("/locations/")) {
    const slug = pathname.split("/")[2] ?? "";
    const location = data.locationNames[slug] ?? titleFromSlug(slug);
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

function breadcrumbSchema(pathname: string, seo: RouteSeo) {
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

function serviceSchema(pathname: string, service: ServiceDefinition) {
  const isLocation = pathname.startsWith("/locations/");
  const location = isLocation
    ? data.locationNames[pathname.split("/")[2] ?? ""]
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

export function buildStructuredData(pathname: string, seo = getRouteSeo(pathname)) {
  const graph: Record<string, unknown>[] = [businessSchema(), websiteSchema()];

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

export { BUSINESS_ID, WEBSITE_ID, SERVICE_AREA_NAMES };