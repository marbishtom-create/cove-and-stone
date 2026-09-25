---
name: Image-edit aspect ratios
description: Check AI-edited media dimensions, object scale, and responsive crops before replacing site imagery.
---

AI image edits can change the source aspect ratio and the scale of individual objects, even when the instruction asks to preserve framing or make a measured size change. When expanding a portrait frame to a landscape canvas, prepare a cover-cropped background before compositing; ImageMagick `-extent` can expose a white default canvas if the background is not explicit.

**Why:** A landscape crop produced a square edit, an object-size adjustment came back larger than requested, and a portrait-video hero initially exposed white side panels from the default `-extent` canvas. A polished-looking image can still have the wrong geometry or canvas.

**How to apply:** Use pixel-based edits for exact size changes. Compare image dimensions and object bounds, set an explicit background when extending a canvas, then inspect the actual desktop and mobile crops before wiring an edit into a page.