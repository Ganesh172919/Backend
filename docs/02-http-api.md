# 02 — HTTP APIs (REST basics)

## Endpoint design
- Use nouns for resources: `/users`, `/orders`
- Use verbs rarely: `/orders/{id}/cancel` is sometimes OK
- Use consistent naming and casing

## Methods (common)
- `GET` read
- `POST` create
- `PUT` replace
- `PATCH` partial update
- `DELETE` remove

## Status codes (common)
- `200` OK
- `201` Created
- `204` No Content
- `400` Validation error
- `401` Not authenticated
- `403` Not authorized
- `404` Not found
- `409` Conflict
- `429` Rate limited
- `500` Server error

## Pagination
Prefer cursor pagination for large datasets:
- Request: `?cursor=...&limit=50`
- Response includes `nextCursor`

## Error format (suggested)
Return a consistent JSON shape:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "email is invalid",
    "details": [{"field": "email", "issue": "invalid_format"}]
  }
}
```
