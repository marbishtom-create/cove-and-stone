---
name: Responsive project media
description: Cove & Stone project galleries use approved originals for desktop and derived compressed variants for mobile.
---

Use a compressed, appropriately sized derivative of each approved project image or portrait video for small screens while retaining the approved original as the desktop fallback. For phone video, prefer broadly supported H.264/AAC-LC media and a poster captured from the actual video. Keep the asset's existing alt text and visible label tied to both sources.

**Why:** Project imagery and portrait walkthroughs are often the largest payloads in the browsing flow. A poster can make an unsupported or slow video look present in a screenshot, so phone-sized checks must confirm the actual media path and not only the markup.

**How to apply:** When adding or replacing project gallery media, provide both source variants and cover the asset paths plus responsive `<picture>` or `<video>` markup with a lightweight regression check. Verify the rendered phone viewport after bundling.