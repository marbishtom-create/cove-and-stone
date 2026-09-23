---
name: Prerender metadata validation
description: Validation rule for comparing route-specific metadata emitted into static HTML.
---

Generated HTML escapes characters such as ampersands and apostrophes in titles and meta attributes. Decode those entities before comparing expected route metadata, or valid prerendered output can be reported as a false failure.

**Why:** The initial SEO validation compared raw attribute strings and incorrectly rejected correct route metadata because the HTML serializer emitted `&amp;` and `&#39;`.

**How to apply:** Any static HTML SEO check should validate decoded title, description, canonical, Open Graph, and Twitter values, then separately parse the JSON-LD script and test direct route requests.