# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:

1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

---

## Project Overview

This repository implements the Week 4 MERN blog application per the assignment. It includes:

- REST API for posts and categories
- JWT-based authentication (register/login) and protected routes
- React client with routing, forms, hooks, and optimistic UX
- Image upload support for post featured images (local uploads directory)

## Monorepo Structure

```
./client/  # React app (Vite)
./server/  # Express API (MongoDB via Mongoose)
```

## Setup Instructions

Prerequisites: Node.js v18+, MongoDB running locally (or Atlas), npm.

1. Install dependencies

```
cd server && npm install
cd ../client && npm install
```

2. Configure environment

- Server env variables (set in your shell or a local .env):
  - `PORT` (default 5000)
  - `MONGO_URI` (e.g. mongodb://127.0.0.1:27017)
  - `MONGO_DB` (e.g. mern_blog)
  - `JWT_SECRET` (set to a strong secret)
- Client env variables (optional):
  - `VITE_API_URL` (default `/api` and proxied to server in dev)

3. Start development servers

In two terminals:

```
# Terminal A
cd server
npm run dev

# Terminal B
cd client
npm run dev
```

Vite dev server runs at `http://localhost:5173` with a proxy to `http://localhost:5000` for `/api`.

## API Documentation

Base URL: `/api`

- `GET /posts` — list posts with pagination and search
  - Query: `page`, `limit`, `search`
- `GET /posts/:id` — get a single post
- `POST /posts` — create post (auth required)
  - FormData fields: `title`, `content`, `category`, `featuredImage` (file)
- `PUT /posts/:id` — update post (auth required)
  - FormData fields optional
- `DELETE /posts/:id` — delete post (auth required)
- `GET /categories` — list categories
- `POST /categories` — create category (auth required)
- `POST /auth/register` — create user, returns `{ token, user }`
- `POST /auth/login` — authenticate, returns `{ token, user }`

Auth: Send `Authorization: Bearer <token>` for protected endpoints.

## Features Implemented

- CRUD for posts and categories
- Input validation using `express-validator`
- Centralized error handling
- JWT authentication and protected routes
- Image upload (local) for featured images
- React Router pages: list, detail, create/edit, auth
- Hooks for data fetching and state management
- Basic pagination and search

## Screenshots

Add screenshots of list, detail, and create/edit screens here once running locally.
