# AI Template: SSRF (Server-Side Request Forgery) Scanner

Scans for vulnerable parameters that trigger server-side HTTP requests.

## Indicators:
- Parameters like `url=`, `redirect=`, `next=`, etc.
- Server responds with internal IPs, metadata, or unexpected content

## Test Flow:
1. Inject known SSRF payloads (`http://169.254.169.254`).
2. Observe timing, error messages, or data leaks.

> Use Burp Collaborator or Interactsh for out-of-band detection.
