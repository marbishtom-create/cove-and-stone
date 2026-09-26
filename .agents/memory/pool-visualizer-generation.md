---
name: Pool visualizer generation boundary
description: The customer-facing pool builder uses deterministic local composition for reliable previews and avoids claiming photorealistic AI output.
---

The pool builder should always render a usable before/after concept locally from the uploaded photo and selected configuration. The selected dimensions, shape, water finish, waterline tile, lights, waterfall, and sun shelf must visibly affect the concept view without relying on a network generation response.

**Why:** A failed or unavailable image-generation request previously left the customer with an upload confirmation but no configured visual result. A deterministic concept is more reliable and keeps illustrative work separate from completed-project photography.

**How to apply:** Keep the live preview, comparison slider, export, and configuration controls functional offline. If photorealistic AI generation is added later, make it an enhancement with an explicit loading/error state and preserve the local concept fallback.

For internal email, keep the uploaded backyard photo out of the serialized SVG. Send the photo and AI rendering as separate attachments; the email contract limits the SVG field to 120 KB, and an embedded base64 photo caused the handoff request to fail validation.

**Why:** The visualizer preview embeds the photo as an SVG image, while the email already sends that photo separately. Duplicating the bytes made a normal photo-based concept exceed the SVG field limit.

**How to apply:** Strip photo-background nodes from the email-only SVG clone. Preserve the full photo in the live preview and attach it separately to the internal handoff.

For brush edits of Gemini-generated concepts, send the current rendering and a separate white-on-black PNG mask as guidance. The mask is not a pixel-locked inpainting boundary, so tell customers that unmarked pixels may also change. A successful edit invalidates the previous walkthrough; require a new walkthrough before sending the edited concept.

**Why:** Gemini image editing does not guarantee strict mask boundaries, and a walkthrough generated from the pre-edit image would no longer represent the concept being handed off.

**How to apply:** Keep deterministic local previews available, describe mask edits as approximate, preserve the current image on failure, and bind any walkthrough to the exact edited rendering.