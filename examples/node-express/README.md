# Node + Express (minimal learning API)

## What this example includes
- `GET /health` health check
- Basic CRUD-like endpoints for an in-memory `todos` list
- Simple validation and consistent JSON errors

## Run
From this folder:

```bash
npm install
npm run dev
```

Then open:
- http://localhost:3000/health

## Endpoints
- `GET /todos`
- `POST /todos` body: `{ "title": "..." }`
- `PATCH /todos/:id` body: `{ "title": "...", "done": true }`
- `DELETE /todos/:id`
