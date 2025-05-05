# AI Template: Authentication Bypass Detector

Looks for flawed logic or misconfigurations that allow bypassing authentication.

## Indicators:
- Missing checks on backend
- JWT manipulation
- Forced browsing of auth-only endpoints

## Test Flow:
1. Access restricted area without session cookie.
2. Try tampered cookies, altered JWTs, default passwords.

> Always test with and without proper roles.
