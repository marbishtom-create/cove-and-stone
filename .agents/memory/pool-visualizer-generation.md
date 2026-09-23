---
name: Pool visualizer generation boundary
description: The customer-facing pool builder uses deterministic local composition for reliable previews and avoids claiming photorealistic AI output.
---

The pool builder should always render a usable before/after concept locally from the uploaded photo and selected configuration. The selected dimensions, shape, water finish, waterline tile, lights, waterfall, and sun shelf must visibly affect the concept view without relying on a network generation response.

**Why:** A failed or unavailable image-generation request previously left the customer with an upload confirmation but no configured visual result. A deterministic concept is more reliable and keeps illustrative work separate from completed-project photography.

**How to apply:** Keep the live preview, comparison slider, export, and configuration controls functional offline. If photorealistic AI generation is added later, make it an enhancement with an explicit loading/error state and preserve the local concept fallback.