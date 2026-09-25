---
name: MiniMax key regions
description: Replit's MiniMax connector uses the Global API host and rejects keys issued for the Mainland China platform.
---

The Replit `minimax` connector sends requests to MiniMax's Global/International API host. MiniMax keys are region-specific, so a key issued by the Mainland China platform can fail with provider status 1004. Status 1004 can also mean the key is missing or invalid.

**Why:** The pool walkthrough reached MiniMax's documented video endpoint and model but returned authentication status 1004 before a task ID was created.

**How to apply:** For status 1004, check that the existing Replit MiniMax connection has a valid Global/International key before changing request parameters. This is an API-key connection, so do not use OAuth reauthorization or ask anyone to paste the key into chat.