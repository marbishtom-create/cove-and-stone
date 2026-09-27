---
name: Prerendered route validation
description: Metadata, body-content, and router-base checks for generated HTML routes.
---

Generated HTML escapes characters such as ampersands and apostrophes in titles and meta attributes. Decode those entities before comparing expected route metadata, or valid prerendered output can be reported as a false failure.

**Why:** The initial SEO validation compared raw attribute strings and incorrectly rejected correct route metadata because the HTML serializer emitted `&amp;` and `&#39;`.

**How to apply:** Static HTML checks should compare decoded title and description values, validate canonical and social URLs, parse JSON-LD, and inspect actual route output rather than checking metadata alone.

When Vite's artifact base is a nested path, Wouter's SSR route path must include that base exactly once. Keep the public sitemap and canonical URLs rooted at the production origin; normalize only the path passed into the SSR router.

**Why:** Passing an unprefixed sitemap path to a router built with a nested base can render the fallback or home page for every location URL while route-specific metadata still appears correct.

**How to apply:** For every generated location page, validate one unique server-rendered H1 and the expected visible FAQ count in addition to metadata and structured data.