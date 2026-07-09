# Meu Closet API

REST API for the **Meu Closet** wardrobe manager (Angular frontend).

## Stack

- Node.js + Express 4
- MongoDB + Mongoose 7
- JWT authentication
- Yup validation

## Setup

```bash
cp .env.example .env
npm install
npm start
```

Server runs on `http://localhost:3001` by default.

## Environment

| Variable | Description |
|----------|-------------|
| `DB_CONNECTION` | MongoDB connection string |
| `PORT` | API port (default `3001`) |
| `SECRET` | JWT secret |
| `EXPIRESIN` | JWT expiry (e.g. `30d`) |
| `BASE_URL` | Frontend URL for password reset links |
| `CORS_ORIGINS` | Allowed origins (comma-separated). Empty = allow all (dev) |
| `HOST`, `PORT_MAIL`, `USER`, `PASS`, `SERVICE` | SMTP for password recovery |

## Health check

```
GET /health
```

## Main routes

All routes are prefixed with `/api`.

| Area | Examples |
|------|----------|
| Auth | `POST /createAccount`, `/login`, `/logout` |
| User | `GET /user/:userId`, `PUT /updateUser/:id`, `POST /retrievePassword`, `/resetPassword` |
| Inventory | `/clothes`, `/shoes`, `/handbags`, `/accessories`, `/bandanas` |
| Metadata | `/categories`, `/tags`, `/places` |
| Looks | `/looks`, `/plannedLooks`, `/unused-looks` |
| Dashboard | `/dashboard?year=`, `/next-planned-look` |

Protected routes require `Authorization: <token>` or `Authorization: Bearer <token>`.

## Tests

```bash
npm test
```

## Security notes

- User profile routes enforce ownership (no IDOR)
- Resource updates strip `userId` from request body
- Permission errors return **403**, not found returns **404**
- Password recovery does not reveal whether an email exists
