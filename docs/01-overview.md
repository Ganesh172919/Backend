# 01 — Backend overview

## What you build in backend
- APIs for clients (web/mobile/service-to-service)
- Business logic and workflows
- Data storage and retrieval
- Security (auth, permissions, secrets)
- Reliability (timeouts, retries, queues)
- Observability (logs, metrics, traces)

## Mental model (request lifecycle)
1. Client sends a request (HTTP).
2. Reverse proxy / API gateway applies TLS + rate limits.
3. Backend authenticates the user/service.
4. Handler validates input.
5. Service runs business rules.
6. Repository reads/writes database and/or cache.
7. Response returned (status code + JSON).

## “Good backend” checklist
- Clear API contracts (OpenAPI/Swagger)
- Input validation everywhere
- Correct HTTP status codes
- Proper error handling with consistent error format
- Logging with request IDs
- Timeouts and retries for outgoing calls
- Tests (unit + integration)
