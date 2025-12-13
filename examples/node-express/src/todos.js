import { Router } from 'express';

export const todosRouter = Router();

let nextId = 1;
const todos = [];

function validationError(res, message, details = []) {
  return res.status(400).json({
    error: {
      code: 'VALIDATION_ERROR',
      message,
      details
    }
  });
}

function parseId(idParam) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

todosRouter.get('/', (req, res) => {
  res.status(200).json({ data: todos });
});

todosRouter.post('/', (req, res) => {
  const title = req.body?.title;
  if (typeof title !== 'string' || title.trim().length < 1) {
    return validationError(res, 'title is required', [{ field: 'title', issue: 'required' }]);
  }

  const todo = {
    id: nextId++,
    title: title.trim(),
    done: false,
    createdAt: new Date().toISOString()
  };

  todos.push(todo);
  return res.status(201).json({ data: todo });
});

todosRouter.patch('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return validationError(res, 'id must be a positive integer');

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'todo not found' } });
  }

  const { title, done } = req.body ?? {};

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length < 1) {
      return validationError(res, 'title must be a non-empty string', [{ field: 'title', issue: 'invalid' }]);
    }
    todo.title = title.trim();
  }

  if (done !== undefined) {
    if (typeof done !== 'boolean') {
      return validationError(res, 'done must be boolean', [{ field: 'done', issue: 'invalid' }]);
    }
    todo.done = done;
  }

  return res.status(200).json({ data: todo });
});

todosRouter.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return validationError(res, 'id must be a positive integer');

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'todo not found' } });
  }

  todos.splice(index, 1);
  return res.status(204).send();
});
