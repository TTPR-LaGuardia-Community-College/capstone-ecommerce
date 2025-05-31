# E‑commerce Starter – PERN • Vite/React

Welcome to your capstone e‑commerce project! This starter repo gives you everything you need to build a full-stack online store using the PERN stack: PostgreSQL, Express, React (via Vite), and Node.js.

This project is designed to help you skip the boilerplate and dive straight into feature development.

> 💡 Replace the project title and customize the design to make it your own storefront!

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Getting Started](#getting-started)
5. [Scripts](#scripts)
6. [Contributing](#contributing)
7. [License](#license)
8. [Authors](#authors)

---

## Features

- 🛒 **Product Catalogue** – browse all products and view detailed pages.
- ➕ **Cart Management** – add, increment, decrement, and remove items.
- 🔐 **JWT Auth** – register / login with secure password hashing.
- 💾 **Persisted Cart** – cart survives page refresh and syncs after login.
- ⚙️ **Admin CRUD** – create, update & delete products, manage users & orders (Tier 4 task).

> See `REQUIREMENTS.md` for the full milestone checklist.

---

## Tech Stack

| Layer     | Tech                                                         |
| --------- | ------------------------------------------------------------ |
| Frontend  | React 18 (Vite), React Router 6, Redux Toolkit / Context API |
| Styling   | CSS Modules (Tailwind optional), ESLint + Prettier           |
| Backend   | Express 5, Sequelize 7, PostgreSQL 15, JWT (jsonwebtoken)    |
| Dev Tools | Vite, Nodemon, dotenv                                        |

---

## Folder Structure

```
.
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   ├── config/              # Sequelize config
│   │   │   │   └── config.json
│   │   │   ├── migrations/          # Sequelize migrations
│   │   │   │   └── YYYYMMDD-create-user.js
│   │   │   ├── models/              # Sequelize models
│   │   │   │   └── user.js
│   │   │   └── index.js             # DB setup and associations
│   │   ├── routes/                  # Express routes
│   │   │   ├── index.js
│   │   │   └── users.js
│   │   └── app.js                   # Express app instance
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/                      # Static assets
│   │   └── vite.svg
│   ├── src/                         # React app
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── package-lock.json
├── package.json                    # Root-level npm workspaces config
├── package-lock.json
├── README.md
└── REQUIREMENTS.md                 # Milestones & tasks
```

---

## Getting Started

### Prerequisites

- **Node.js ≥ 18** – [download](https://nodejs.org/)
- **PostgreSQL ≥ 14** – [installation guide](https://www.postgresql.org/download/)

### Installation

```bash
# Step 1: Clone the repository
git clone <your‑repo‑url>
cd <project‑directory>

# Step 2: Install dependencies (npm workspaces will handle both frontend/backend)
npm install

# Step 3: Seed the database
npm run seed

# Step 4: Start development servers
npm run dev    # Frontend on http://localhost:5173, API on http://localhost:3000

```

### Scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Starts frontend and backend concurrently |
| `npm run migrate`  | Runs Sequelize migrations                |
| `npm run rollback` | Reverts last Sequelize migration         |

---

## Contributing

1. Fork the repo & create a feature branch.
2. Commit using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
3. Push and open a PR against `main`.

---

## License

Distributed under the **MIT** License. See `LICENSE` for more information.

---

## Authors

| Name                 | LinkedIn                                | GitHub                       |
| -------------------- | --------------------------------------- | ---------------------------- |
| **Lan Hikari**       | [LinkedIn](https://linkedin.com/in/...) | [Github](https://github.com) |
| _Add your teammates_ |                                         |                              |
