# 04 — Database basics

## SQL vs NoSQL
### Choose SQL (PostgreSQL) when
- You need transactions (ACID)
- You need constraints + joins
- You need analytics/reporting queries

### Choose NoSQL when
- Schema changes often
- Your access patterns are simple and you scale by partitioning

## Essential practices
- Migrations are mandatory (schema is code)
- Add indexes for frequently filtered/sorted columns
- Use transactions for multi-step writes
- Separate “files” from DB: store files in object storage, metadata in DB

## Caching (Redis)
Use cache for:
- Hot reads
- Rate limiting
- Session storage (optionally)

Avoid:
- Caching data you can’t invalidate reliably
