---
name: Image-edit aspect ratios
description: Check AI-edited media dimensions, object scale, and responsive crops before replacing site imagery.
---

AI image edits can change the source aspect ratio and the scale of individual objects, even when the instruction asks to preserve framing or make a measured size change.

**Why:** A landscape crop produced a square edit, and an object-size adjustment came back larger than requested. A polished-looking image can still have the wrong geometry.

**How to apply:** Use pixel-based edits for exact size changes. Compare image dimensions and object bounds, then inspect the actual desktop and mobile crops before wiring an edit into a page.