export const SITE_URL = "https://coveandstonepools.com";
export const SITE_NAME = "Cove & Stone Pools";
export const SITE_IMAGE = `${SITE_URL}/brand/cove-and-stone-approved.png`;
export const DEFAULT_DESCRIPTION =
  "Cove & Stone designs custom pools, spas, pool renovations and complete outdoor living spaces in Jacksonville, Ponte Vedra, Nocatee and Northeast Florida.";

export function absoluteUrl(path = "/") {
  const normalizedPath = path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
  return `${SITE_URL}${normalizedPath}`;
}