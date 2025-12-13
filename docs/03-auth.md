# 03 — Authentication & Authorization

## Authentication (AuthN)
“How do we know who you are?”

Common approaches:
- JWT (stateless)
- Sessions (cookie-based)
- OAuth2 / OIDC (recommended for production)

## Authorization (AuthZ)
“What are you allowed to do?”

Common models:
- RBAC (role-based access control)
- ABAC (attribute-based, more flexible)

## Practical rules
- Never store plain passwords: hash with `bcrypt`/`argon2`.
- Enforce permissions server-side for every sensitive action.
- Don’t trust client claims (roles/scopes) without verification.
- Use short-lived access tokens + refresh tokens where applicable.

## API hardening
- Rate limiting
- Input validation
- CSRF protection (for cookie-based auth)
- Secure headers
