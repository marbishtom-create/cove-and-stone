export const SITE_URL = "https://coveandstonepools.com";
export const SITE_NAME = "Cove & Stone Pools";
export const SITE_IMAGE = `${SITE_URL}/brand/cove-and-stone-approved-black-type.png`;
export const SITE_OG_IMAGE = `${SITE_URL}/brand/cove-and-stone-social-share.jpg`;
export const DEFAULT_DESCRIPTION =
  "Cove & Stone designs custom pools, spas, pool renovations and complete outdoor living spaces in Jacksonville, Ponte Vedra, Nocatee and Northeast Florida.";

export function canonicalPathname(pathname = "/") {
  const pathOnly = pathname.split(/[?#]/)[0] || "/";
  if (pathOnly === "/") {
    return "/";
  }

  return `/${pathOnly.replace(/^\/+|\/+$/g, "")}/`;
}

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${canonicalPathname(path)}`;
}