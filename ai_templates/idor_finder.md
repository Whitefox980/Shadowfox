# AI Template: IDOR (Insecure Direct Object Reference) Finder

Detects patterns where user-controlled input can access unauthorized resources (e.g., `/user/12345/profile`).

## Indicators:
- Numeric or UUID patterns in URLs
- Lack of access control on resource endpoints

## Test Flow:
1. Identify endpoints with resource identifiers.
2. Replace ID with another valid ID.
3. Observe access without proper authorization.

> Tip: Automate with fuzzing tools or add token-based comparison.
