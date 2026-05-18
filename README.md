# Smart Todo App

A full-stack todo application with a React frontend and NestJS backend.

## Stack

- **Frontend**: React 18, Create React App (port 3000)
- **Backend**: NestJS, TypeScript, Express (port 5001)

## Getting Started

### Prerequisites

- Node.js 18+

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`.

## API

Base URL: `http://localhost:5001/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/todos` | List todos (supports `?filter=`, `?priority=`, `?sortBy=`) |
| POST | `/todos` | Create a todo |
| GET | `/todos/:id` | Get a todo |
| PUT | `/todos/:id` | Update a todo |
| PATCH | `/todos/:id/toggle` | Toggle completed |
| DELETE | `/todos/:id` | Delete a todo |
| DELETE | `/todos/completed` | Clear all completed |

### Todo fields

```json
{
  "title": "string (required)",
  "description": "string",
  "priority": "low | medium | high",
  "dueDate": "ISO date string",
  "tags": ["string"]
}
```

## Project Structure

```
smart-todo-app/
├── frontend/        # React app
│   └── src/
│       ├── components/
│       ├── hooks/
│       └── services/
└── backend/         # NestJS app
    └── src/
        ├── todos/
        │   ├── dto/
        │   ├── todo.entity.ts
        │   ├── todos.controller.ts
        │   ├── todos.module.ts
        │   └── todos.service.ts
        ├── filters/
        ├── app.controller.ts
        ├── app.module.ts
        └── main.ts
```
