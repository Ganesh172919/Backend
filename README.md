# Backend Development Practice (Complete Guide)

This repository is a living reference for **backend development practice**: how modern backends work, how to design APIs, how to choose a tech stack, how to store data reliably, and how to integrate AI models safely.

## Learn by reading
- [docs/01-overview.md](docs/01-overview.md)
- [docs/02-http-api.md](docs/02-http-api.md)
- [docs/03-auth.md](docs/03-auth.md)
- [docs/04-database.md](docs/04-database.md)
- [docs/05-background-jobs.md](docs/05-background-jobs.md)
- [docs/06-ai-integration.md](docs/06-ai-integration.md)

## Learn by doing
- Minimal API example: [examples/node-express/README.md](examples/node-express/README.md)

## 1) What a backend does (overview)
A backend is the system that:

- Exposes **APIs** (HTTP/gRPC/WebSockets) for clients (web/mobile/services)
- Implements **business logic** (rules, validation, workflows)
- Manages **data** (databases, caches, files, events)
- Enforces **security** (auth, authorization, secrets, rate limits)
- Provides **reliability** (retries, idempotency, queues)
- Enables **operations** (logging, monitoring, scaling, deployments)

### Typical request flow
1. **Client** sends request (e.g., `POST /orders`).
2. **API gateway / reverse proxy** terminates TLS, applies rate limits.
3. **Auth layer** verifies identity (JWT/OAuth2/session).
4. **Controller/Handler** validates input and routes it.
5. **Service layer** runs business logic.
6. **Data layer** reads/writes DB and/or cache; may enqueue jobs.
7. **Response** returned with status code + JSON.
8. **Logs/Metrics/Traces** recorded for observability.

## 2) Core building blocks

### APIs
Common API styles:

- **REST**: resource-based endpoints, simple and widely supported.
- **GraphQL**: flexible queries; great for frontend-driven data needs.
- **gRPC**: high-performance service-to-service communication.
- **WebSockets / SSE**: real-time updates and streaming.

Best practices:

- Use **clear resource naming** (`/users`, `/orders/{id}`)
- Version APIs intentionally (`/v1/...` or header-based)
- Validate input strictly; return consistent error shapes
- Make writes **idempotent** where possible (important for retries)
- Use pagination (`limit/offset` or cursor-based)

### Data storage
You typically use multiple storage systems:

- **Relational DB (SQL)** for strong consistency and complex queries
	- Examples: PostgreSQL, MySQL
- **NoSQL** for flexible schemas / high scale / specific access patterns
	- Examples: MongoDB, DynamoDB
- **Cache** for performance and rate protection
	- Examples: Redis
- **Search** for full-text and relevance
	- Examples: Elasticsearch / OpenSearch
- **Object storage** for files/blobs
	- Examples: S3-compatible storage, Azure Blob, GCS
- **Queues/streams** for async work and event-driven flows
	- Examples: RabbitMQ, Kafka, SQS

### Background jobs
Use background jobs for:

- Email/SMS sending
- Video/image processing
- AI inference that may take time
- Webhook delivery and retries
- Scheduled tasks (cron)

Patterns:

- **Queue + workers** (at-least-once delivery)
- **Outbox pattern** for reliable event publishing
- **Idempotent workers** to handle duplicates

### Observability
Non-negotiables in production:

- **Structured logs** (JSON logs, request IDs)
- **Metrics** (latency, error rate, saturation)
- **Distributed tracing** (OpenTelemetry)
- **Alerting** (SLOs: e.g., 99.9% availability)

## 3) How to structure backend code (clean architecture-ish)
Even small services benefit from predictable layers:

- **Routes/Controllers**: HTTP binding only
- **Services/Use-cases**: business logic
- **Repositories/DAOs**: persistence details
- **Domain models**: types/entities; invariants
- **Integrations**: payments, emails, AI providers, etc.

Guiding rules:

- Keep business rules out of controllers.
- Avoid DB-specific logic leaking everywhere.
- Add boundaries so you can test logic without the network/DB.

## 4) Best tech stacks (practical recommendations)
There is no single “best” stack; choose based on team skills, hiring, ecosystem, and performance needs.

### Recommended defaults (common, modern, high ROI)

#### Option A: TypeScript (Node.js)
- **Runtime**: Node.js (LTS)
- **Framework**: NestJS (opinionated) or Fastify/Express (minimal)
- **Validation**: Zod / class-validator
- **DB**: PostgreSQL
- **ORM**: Prisma (excellent DX) or TypeORM
- **Cache/Queue**: Redis + BullMQ
- **Docs**: OpenAPI/Swagger
- **Testing**: Jest + Supertest

Why it’s strong: fast iteration, great tooling, large ecosystem.

#### Option B: Python
- **Framework**: FastAPI
- **DB**: PostgreSQL
- **ORM**: SQLAlchemy 2.x
- **Migrations**: Alembic
- **Validation**: Pydantic
- **Async jobs**: Celery/RQ (Redis/RabbitMQ)
- **Testing**: Pytest

Why it’s strong: excellent for data/AI-adjacent services and rapid development.

#### Option C: Java / Kotlin
- **Framework**: Spring Boot
- **DB**: PostgreSQL
- **Migrations**: Flyway/Liquibase
- **Testing**: JUnit

Why it’s strong: enterprise maturity, strong reliability, very scalable.

#### Option D: Go
- **Framework**: net/http, Gin, or Fiber
- **DB**: PostgreSQL
- **Migrations**: golang-migrate
- **Testing**: Go test

Why it’s strong: performance, low memory, simple deployment.

### Infrastructure defaults (work almost everywhere)
- **Containerization**: Docker
- **Reverse proxy**: NGINX / Traefik
- **CI/CD**: GitHub Actions / Azure DevOps
- **Hosting**: Azure, AWS, GCP (or on-prem)
- **Secrets**: managed secret store (Azure Key Vault / AWS Secrets Manager)

## 5) Databases: how to choose and how it works

### When to choose SQL (PostgreSQL)
Choose SQL when you need:

- Transactions (ACID)
- Constraints (foreign keys, uniqueness)
- Rich querying and reporting

Key practices:

- Use **migrations** (schema changes are code)
- Add **indexes** for high-traffic queries
- Prefer **UUIDs** or database-generated IDs consistently
- Use **soft deletes** only when required
- Keep **PII** minimal; encrypt sensitive fields if needed

### When to choose NoSQL
Choose NoSQL when:

- Schema evolves rapidly
- Access patterns are simple and known
- You need horizontal scaling by design

Key practices:

- Model for access patterns (not just “entities”)
- Understand consistency and partitioning

### Object storage
Use object storage for:

- User uploads
- Large exports
- ML datasets

Best practices:

- Store metadata in DB; store files in object storage
- Use signed URLs for upload/download
- Enforce content type + size limits

## 6) Security essentials

### Authentication & authorization
- **AuthN**: Who are you? (JWT/OAuth2/session)
- **AuthZ**: What can you do? (RBAC/ABAC/permissions)

Best practices:

- Hash passwords with **bcrypt/argon2** (never plain text)
- Use **least privilege**
- Validate scopes/roles on every sensitive action

### API hardening
- Rate limit and throttle abusive patterns
- Use TLS everywhere
- Protect against injection (SQL injection, command injection)
- Validate and sanitize input
- Use CSRF protection if using cookie-based auth

### Secrets
- Never commit secrets to git
- Use environment variables locally
- Use managed secret stores in production

## 7) Reliability patterns

- **Timeouts** for every network call
- **Retries with backoff** for transient failures (but avoid retry storms)
- **Circuit breakers** when dependencies are unstable
- **Idempotency keys** for payment/order creation
- **Graceful shutdown** so deployments don’t drop requests

## 8) Testing strategy (what “good” looks like)

- **Unit tests**: business logic in services/use-cases
- **Integration tests**: DB + API together (test containers are great)
- **Contract tests**: ensure APIs behave as clients expect
- **Load tests**: verify latency and throughput targets

Minimum baseline:

- CI runs tests on every PR
- Lint + formatting enforced
- Migrations tested (apply + rollback if supported)

## 9) AI model integration (how we connect models, APIs, and databases)
AI features are backend features: they need the same reliability, security, and observability.

### Common ways to connect AI models

#### A) Direct provider API (hosted LLM)
Backend calls a hosted model (OpenAI/Azure OpenAI/Anthropic/etc.).

Typical flow:
- API receives prompt/context
- Backend builds a **system prompt** + user message
- Backend calls model API
- Backend returns response (optionally streaming)

Best practices:

- Redact/remove secrets and PII before sending
- Use **timeouts**, retries, and provider failover if needed
- Log safely (don’t store raw prompts if they contain sensitive data)

#### B) Self-hosted inference
Run models in your own environment (GPU/CPU) using an inference server.

Why:
- Data residency
- Cost control at scale
- Custom fine-tunes

#### C) Async AI jobs
For heavy tasks (summaries, classification on large docs), use:

- API → enqueue job → worker runs model → store result → notify client

### RAG (Retrieval-Augmented Generation)
RAG makes models more accurate by retrieving relevant documents from your data.

Typical RAG pipeline:
1. Ingest docs (PDF/text/web pages)
2. Chunk text + create **embeddings**
3. Store embeddings in a **vector database**
4. At query time: embed the question → retrieve top-k chunks → prompt model with citations/context

Vector store options:
- PostgreSQL + pgvector
- Pinecone / Weaviate / Milvus

### Tool/function calling (AI + APIs)
The model can choose to call backend tools:

- `searchOrders(userId)`
- `createTicket(subject, description)`
- `getAccountBalance(accountId)`

Important controls:

- Validate tool inputs like any other API request
- Enforce permissions (models don’t bypass auth)
- Audit tool calls and outputs

### Storing AI data
Decide what to store and for how long:

- Conversation logs (optional; consider privacy)
- Model inputs/outputs (often partial or redacted)
- Derived artifacts (summaries, tags, embeddings)

Retention should match product and compliance requirements.

## 10) Deployment and operations (how it runs in production)

### Typical production setup
- DNS → CDN (optional) → reverse proxy/API gateway → backend service(s)
- Backends connect to DB/cache/queues over private networking
- Centralized logs and metrics

### CI/CD pipeline basics
- Lint + typecheck
- Run tests
- Build container image
- Run security scans (SCA/container)
- Deploy to staging
- Promote to production

### Configuration
- Use environment-based config (`dev`, `staging`, `prod`)
- Never bake secrets into images

## 11) What to practice next (backend learning roadmap)

1. Build a CRUD API with validation + pagination
2. Add JWT auth + RBAC
3. Add PostgreSQL with migrations and indexes
4. Add Redis cache + rate limiting
5. Add background jobs for emails/webhooks
6. Add OpenAPI docs + contract tests
7. Add observability (OpenTelemetry)
8. Add an AI feature (RAG + pgvector) safely

---

If you tell me which stack you want to practice (Node/TS, Python, Java, Go), I can scaffold a minimal project structure in this workspace and add example APIs + DB schema + an AI integration path.
