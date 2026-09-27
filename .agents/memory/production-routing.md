---
name: Production routing and SEO status codes
description: Static catch-all hosting cannot provide route-aware redirects or real 404 responses for this site.
---

The production web service must run the site’s route-aware server instead of a static catch-all when SEO status codes matter. The server is responsible for trailing-slash redirects, canonical-host redirects, direct delivery of robots and sitemap files, and noindex 404 responses for unknown routes and slugs.

**Why:** A static fallback serves the homepage shell with HTTP 200 for unknown URLs, which can expose fabricated metadata to crawlers and prevents reliable 404 behavior.

**How to apply:** Preserve the route-aware production run command and include HTTP checks for known routes, noncanonical paths, direct SEO files, and unknown routes whenever serving configuration changes.

Replit treats `www` as a separate custom domain from the apex hostname. Add it separately in Publishing, apply its own A and TXT records, keep the TXT record for ongoing SSL renewal, and configure the canonical-host redirect with the DNS registrar.

**Why:** An apex-domain connection alone does not provision HTTPS for `www`, and a client-side redirect cannot run until the browser completes the TLS handshake.

**How to apply:** Check both hostnames independently with HTTPS requests. Do not claim `www` is resolved until its Replit domain and certificate are active and the registrar-level redirect preserves the requested path.