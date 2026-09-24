import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  absoluteUrl,
  canonicalPathname,
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/config/site";
import { buildStructuredData, getRouteSeo } from "@/config/seo-routes";

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

function removeCanonical() {
  document.head.querySelector('link[rel="canonical"]')?.remove();
}

function setStructuredData(pathname: string) {
  let script = document.head.querySelector<HTMLScriptElement>(
    "script#site-structured-data",
  );

  if (!script) {
    script = document.createElement("script");
    script.id = "site-structured-data";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(buildStructuredData(pathname));
}

export function SiteMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    const pathname = canonicalPathname(location);
    const metadata = getRouteSeo(pathname);
    const canonicalUrl = absoluteUrl(pathname);

    document.title = metadata.title;
    setMeta("name", "description", metadata.description);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", SITE_IMAGE);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image:alt", "Cove & Stone Pools, Spas & Outdoor Living logo");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", SITE_IMAGE);
    setMeta("name", "twitter:image:alt", "Cove & Stone Pools, Spas & Outdoor Living logo");
    setMeta("name", "robots", metadata.robots ?? "index,follow");
    if (metadata.isNotFound) {
      removeCanonical();
    } else {
      setCanonical(canonicalUrl);
    }
    setStructuredData(pathname);
  }, [location]);

  return null;
}

export { SITE_URL };