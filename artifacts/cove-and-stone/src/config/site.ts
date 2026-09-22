export const SITE_URL = "https://coveandstonepools.com";
export const SITE_NAME = "Cove & Stone Pools";
export const SITE_IMAGE = `${SITE_URL}/brand/cove-and-stone-approved.png`;
export const DEFAULT_DESCRIPTION =
  "Jacksonville and Ponte Vedra architectural outdoor-living design-build house specializing in custom pools, spas, and complete backyard environments.";

export function absoluteUrl(path = "/") {
  const normalizedPath = path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
  return `${SITE_URL}${normalizedPath}`;
}