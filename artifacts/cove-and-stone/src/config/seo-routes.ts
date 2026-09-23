import routeData from "./seo-routes.json";
import {
  absoluteUrl,
  canonicalPathname,
  DEFAULT_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/config/site";

type ServiceDefinition = {
  name: string;
  serviceType: string;
};

export type FaqDefinition = {
  question: string;
  answer: string;
};

export type PlaceDefinition = {
  name: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
};

export type RouteSeo = {
  title: string;
  description: string;
  robots?: string;
  isNotFound?: boolean;
  service?: ServiceDefinition;
  faqs?: FaqDefinition[];
  place?: PlaceDefinition;
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

const NOT_FOUND_SEO: RouteSeo = {
  title: "Page not found | Cove & Stone Pools",
  description:
    "The page you requested could not be found on the Cove & Stone Pools website.",
  robots: "noindex,nofollow",
  isNotFound: true,
};

function routeKey(pathname: string) {
  const canonical = canonicalPathname(pathname);
  return canonical === "/" ? "/" : canonical.slice(0, -1);
}

export function getRouteSeo(pathname: string): RouteSeo {
  const key = routeKey(pathname);

  if (data.pages[key]) {
    return data.pages[key];
  }

  if (key.startsWith("/projects/") && key.split("/").length === 3) {
    const slug = key.split("/")[2] ?? "";
    const projectName = data.projectNames[slug];
    if (!projectName) {
      return NOT_FOUND_SEO;
    }

    return {
      title: `${projectName} | Cove & Stone`,
      description:
        "Explore a Cove & Stone pool and outdoor-living project direction for Northeast Florida.",
    };
  }

  if (key.startsWith("/locations/") && key.split("/").length === 3) {
    const slug = key.split("/")[2] ?? "";
    const location = data.locationNames[slug];
    if (!location) {
      return NOT_FOUND_SEO;
    }

    return {
      title: `${location} Pool Design & Outdoor Living | Cove & Stone`,
      description: `Explore Cove & Stone custom pools and complete outdoor-living design for ${location} and Northeast Florida.`,
      service: {
        name: `${location} Pool & Outdoor Living Design`,
        serviceType: "Custom pool and outdoor-living design-build",
      },
    };
  }

  return key === "/" ? {
    title: `${SITE_NAME} | Jacksonville Outdoor Living`,
    description: DEFAULT_DESCRIPTION,
  } : NOT_FOUND_SEO;
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

function faqSchema(pathname: string, faqs: FaqDefinition[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(pathname)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function placeSchema(pathname: string, place: PlaceDefinition) {
  return {
    "@type": "Place",
    "@id": `${absoluteUrl(pathname)}#place`,
    name: place.name,
    url: absoluteUrl(pathname),
    address: {
      "@type": "PostalAddress",
      streetAddress: place.streetAddress,
      addressLocality: place.addressLocality,
      addressRegion: place.addressRegion,
      postalCode: place.postalCode,
      addressCountry: place.addressCountry,
    },
  };
}

export function buildStructuredData(pathname: string, seo = getRouteSeo(pathname)) {
  if (seo.isNotFound) {
    return {
      "@context": "https://schema.org",
      "@graph": [],
    };
  }

  const canonicalPath = canonicalPathname(pathname);
  const graph: Record<string, unknown>[] = [businessSchema(), websiteSchema()];

  if (canonicalPath !== "/") {
    graph.push(breadcrumbSchema(canonicalPath, seo));
  }

  if (seo.service) {
    graph.push(serviceSchema(canonicalPath, seo.service));
  }

  if (seo.faqs?.length) {
    graph.push(faqSchema(canonicalPath, seo.faqs));
  }

  if (seo.place) {
    graph.push(placeSchema(canonicalPath, seo.place));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export { BUSINESS_ID, WEBSITE_ID, SERVICE_AREA_NAMES };