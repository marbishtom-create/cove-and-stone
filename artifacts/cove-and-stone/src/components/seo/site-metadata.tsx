import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/config/site";

type PageMetadata = {
  title: string;
  description: string;
};

const PAGE_METADATA: Record<string, PageMetadata> = {
  "/": {
    title: "Cove & Stone Pools | Modern Pools. Elevated Outdoor Living.",
    description: DEFAULT_DESCRIPTION,
  },
  "/pools": {
    title: "Custom Pools & Spas | Cove & Stone Pools",
    description:
      "Explore modern custom pools, spas, water features and architectural finishes designed for Jacksonville and Northeast Florida outdoor living.",
  },
  "/renovations": {
    title: "Pool Renovations & Corrections | Cove & Stone Pools",
    description:
      "Resurface, modernize and reimagine an outdated pool with Cove & Stone's coordinated renovation and outdoor-living design process.",
  },
  "/outdoor-living": {
    title: "Outdoor Living Design | Cove & Stone Pools",
    description:
      "Design a complete Jacksonville outdoor environment with pergolas, kitchens, fire and water features, lighting, stone and landscape coordination.",
  },
  "/projects": {
    title: "Selected Pool & Outdoor-Living Projects | Cove & Stone",
    description:
      "View Cove & Stone concept directions and approved completed project photography for pools and complete outdoor environments across Northeast Florida.",
  },
  "/design": {
    title: "Design Your Backyard | Cove & Stone Pools",
    description:
      "Share your property and preferences with the Cove & Stone design studio to begin a custom pool and outdoor-living concept.",
  },
  "/showroom": {
    title: "Jacksonville Design Studio & Showroom | Cove & Stone",
    description:
      "Visit the Cove & Stone Jacksonville showroom to explore pool finishes, stone, pavers, outdoor kitchens, fire features and lighting.",
  },
  "/financing": {
    title: "Pool & Outdoor-Living Financing | Cove & Stone",
    description:
      "Explore flexible financing options for a Cove & Stone custom pool, renovation or complete outdoor-living transformation.",
  },
  "/commercial": {
    title: "Commercial Pool & Outdoor Environments | Cove & Stone",
    description:
      "Coordinate architectural pools and outdoor environments for hospitality, multifamily, commercial and development projects in Northeast Florida.",
  },
  "/about": {
    title: "About Cove & Stone Pools | Jacksonville Outdoor Living",
    description:
      "Learn how Cove & Stone coordinates modern pools, materials, outdoor rooms and construction support for homeowners across Northeast Florida.",
  },
  "/contact": {
    title: "Start Your Project | Cove & Stone Pools",
    description:
      "Start a conversation about a custom pool, renovation or complete outdoor-living project with Cove & Stone in Jacksonville and Northeast Florida.",
  },
};

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getMetadata(pathname: string): PageMetadata {
  if (PAGE_METADATA[pathname]) {
    return PAGE_METADATA[pathname];
  }

  if (pathname.startsWith("/projects/")) {
    return {
      title: `${titleFromSlug(pathname.split("/")[2] ?? "Project")} | Cove & Stone`,
      description:
        "Explore a Cove & Stone pool and outdoor-living project direction for Northeast Florida.",
    };
  }

  if (pathname.startsWith("/locations/")) {
    const location = titleFromSlug(pathname.split("/")[2] ?? "Northeast Florida");
    return {
      title: `${location} Pool Design & Outdoor Living | Cove & Stone`,
      description: `Explore Cove & Stone custom pools and complete outdoor-living design for ${location} and Northeast Florida.`,
    };
  }

  return {
    title: `${SITE_NAME} | Jacksonville Outdoor Living`,
    description: DEFAULT_DESCRIPTION,
  };
}

function setMeta(attribute: "name" | "property", value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${value}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = href;
}

export function SiteMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    const pathname = location.split(/[?#]/)[0] || "/";
    const metadata = getMetadata(pathname);
    const canonicalUrl = absoluteUrl(pathname);

    document.title = metadata.title;
    setMeta("name", "description", metadata.description);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", SITE_IMAGE);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", SITE_IMAGE);
    setCanonical(canonicalUrl);
  }, [location]);

  return null;
}

export { SITE_URL };