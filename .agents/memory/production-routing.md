---
name: Production routing and SEO status codes
description: Static catch-all hosting cannot provide route-aware redirects or real 404 responses for this site.
---

The production web service must run the site’s route-aware server instead of a static catch-all when SEO status codes matter. The server is responsible for trailing-slash redirects, canonical-host redirects, direct delivery of robots and sitemap files, and noindex 404 responses for unknown routes and slugs.

**Why:** A static fallback serves the homepage shell with HTTP 200 for unknown URLs, which can expose fabricated metadata to crawlers and prevents reliable 404 behavior.

**How to apply:** Preserve the route-aware production run command and include HTTP checks for known routes, noncanonical paths, direct SEO files, and unknown routes whenever serving configuration changes.