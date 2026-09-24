---
name: Date-only API fields
description: Keep date-only form values as strings in generated API clients.
---

Represent date-only values from browser forms as strings with an explicit `YYYY-MM-DD` pattern in OpenAPI when the JSON contract should preserve the input unchanged; avoid `format: date` in this case.

**Why:** The generated client mapped `format: date` to `Date`, while an HTML date input supplies a string. That mismatch broke mutation payload typing and would require hidden conversion at the form boundary.

**How to apply:** Keep date-only form payloads as ISO calendar-date strings, and validate calendar correctness and time-zone-sensitive rules on the server.