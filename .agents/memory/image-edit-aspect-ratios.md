---
name: Image-edit aspect ratios
description: Check AI-edited media dimensions and responsive crops before replacing site imagery.
---

AI image edits can change the source aspect ratio even when the instruction asks to preserve framing.

**Why:** A landscape source produced a square edit, which can change which parts remain visible when a page uses `object-fit: cover`.

**How to apply:** Compare the edited asset's dimensions with the source, then inspect its actual desktop and mobile crops before wiring it into a page.