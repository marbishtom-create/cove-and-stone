---
name: Resend internal handoff
description: Constraints for sending completed pool concepts through the connected Resend integration.
---

Keep completed concept emails server-side and internal-only. The connected Resend credential is restricted to sending, so domain discovery through the provider API may return 401 even when sending is available; the sender must therefore be an address on the verified Cove & Stone domain.

**Why:** The connection cannot be used to inspect available domains, and exposing or collecting provider credentials would be unsafe.

**How to apply:** Use the managed Resend connector from the API server, keep the Sales recipient fixed, and treat provider sender verification as a deployment prerequisite.

Never expose a generated walkthrough URL, stream, or download to the customer-facing browser. Let the client poll only an opaque job ID; resolve a ready job to private object storage on the server only when attaching the MP4 to the fixed internal Sales email.

**Why:** The walkthrough is an internal sales asset, not customer playback or a customer download.

**How to apply:** Keep generated MP4 bytes and storage URLs server-side, and add regression checks whenever the video-job or email API changes.