---
name: Responsive project media
description: Cove & Stone project galleries use approved originals for desktop and derived compressed variants for mobile.
---

Use a compressed, appropriately sized derivative of each approved project image for small screens while retaining the approved original as the desktop fallback. Keep the asset's existing alt text and visible label tied to both sources.

**Why:** Project imagery is often the largest payload in the browsing flow, and mobile visitors should not download desktop-sized files when a smaller derivative is sufficient.

**How to apply:** When adding or replacing project gallery media, provide both source variants and cover the asset paths plus responsive `<picture>` markup with a lightweight regression check.