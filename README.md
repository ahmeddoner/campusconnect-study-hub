# CampusConnect Study Hub

A full-stack web app for university students to create study groups, track tasks, and schedule sessions — all in one place.

**Live app:** https://campusconnect-frontend-3mx7.onrender.com/

Built as part of a web development course at Kristianstad University, May 2026.

---

## How it works

1. Sign up for an account
2. Create a study group — a unique 6-character join code is generated automatically
3. Share the code with your classmates so they can join
4. Inside the group, create tasks and assign statuses (To Do → In Progress → Done)
5. Schedule study sessions with a time, location, or meeting link
6. The group owner can manage members and update group settings

---

## Team

| Name | GitHub |
|---|---|
| Ahmed Al Temimi | [@ahmeddoner](https://github.com/ahmeddoner) |
| Ibrahim Al Jamous | [@ibbex14](https://github.com/ibbex14) |
| Abdul Rehman Khan | [@AbdulRehman1977](https://github.com/AbdulRehman1977) |
| Atheer Sadoon | [@laserchapo](https://github.com/laserchapo) | 

---

## Features

- Sign up and log in with JWT authentication
- Create study groups with a 6-character join code
- Join groups by pasting a join code
- Create and manage tasks with status tracking (To Do → In Progress → Done)
- Schedule study sessions with time, location, or meeting link
- Group owner controls: rename, delete group, remove members

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, React Router, Vite, Tailwind CSS |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL (Neon) via Prisma ORM |
| Auth | JWT + bcryptjs |
| Hosting | Render (backend + frontend) |

---

## Running Locally

### Prerequisites
- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech) free tier)

### 1. Clone the repo

```bash
git clone git@github.com:ahmeddoner/campusconnect-study-hub.git
cd campusconnect-study-hub
```

### 2. Backend setup

```bash
cd backend
npm install
npx prisma generate
```

Create a `.env` file in the `backend` folder:

```
PORT=5000
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=your_secret_here
CLIENT_ORIGIN=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Project Structure

```
campusconnect-study-hub/
├── backend/
│   ├── prisma/         # Database schema and migrations
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── server.js
└── frontend/
    └── src/
        ├── api/        # HTTP client
        ├── components/ # Navbar, ProtectedRoute
        ├── context/    # AuthContext
        └── pages/      # HomePage, Dashboard, GroupPage, etc.
```

---

## API Overview

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/groups` | List user's groups |
| POST | `/api/groups` | Create group |
| POST | `/api/groups/join` | Join group by code |
| GET | `/api/groups/:id` | Get group details |
| GET | `/api/groups/:id/tasks` | List tasks |
| POST | `/api/groups/:id/tasks` | Create task |
| GET | `/api/groups/:id/sessions` | List sessions |
| POST | `/api/groups/:id/sessions` | Schedule session |
