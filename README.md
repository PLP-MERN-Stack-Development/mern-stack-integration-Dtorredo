# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. This project demonstrates seamless integration between front-end and back-end components with authentication, image uploads, and a modern dark-themed UI.

<div align="center">
  <img src="SCR-20251113-htlt.png" alt="Application Screenshot 1" width="600" style="margin: 10px;" />
  <img src="SCR-20251113-htkm.png" alt="Application Screenshot 2" width="600" style="margin: 10px;" />
</div>

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-18.3-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Features in Detail](#-features-in-detail)
- [Project Screenshots](#-project-screenshots)
- [Technologies Used](#-technologies-used)

## ✨ Features

### Core Features

- ✅ **User Authentication** - Register, login, and protected routes with JWT
- ✅ **Blog Posts CRUD** - Create, read, update, and delete blog posts
- ✅ **Image Uploads** - Upload featured images for blog posts
- ✅ **Categories** - Organize posts with categories (Motorsport, Tech News, Blogs, Social Apps)
- ✅ **Search Functionality** - Search posts by title in real-time
- ✅ **Pagination** - Navigate through posts with pagination controls
- ✅ **Responsive Design** - Dark theme UI that works on all devices

### UI/UX Features

- 🎨 **Modern Dark Theme** - Beautiful dark color scheme (#112733 background, #C0FAE6 accents)
- 📱 **Responsive Layout** - 3-column grid on desktop, 2 on tablet, 1 on mobile
- 🖼️ **Image Display** - Full-size images in post detail view with side-by-side layout
- ➕ **Create Post Card** - Visual "Create New Post" card in the main grid
- 🔍 **Real-time Search** - Instant search results as you type

## 📁 Project Structure

```
mern-stack-integration-Dtorredo/
├── client/                      # React front-end (Vite)
│   ├── public/                  # Static files
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── PostCard.jsx     # Post card component
│   │   │   └── NewPostCard.jsx  # Create post card
│   │   ├── pages/               # Page components
│   │   │   ├── PostList.jsx     # Post listing with search & pagination
│   │   │   ├── PostDetail.jsx  # Single post view
│   │   │   ├── PostForm.jsx    # Create/edit post form
│   │   │   ├── Login.jsx       # Login page
│   │   │   └── Register.jsx    # Registration page
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── usePosts.js      # Posts data fetching hook
│   │   │   └── useCategories.js # Categories data fetching hook
│   │   ├── services/            # API services
│   │   │   └── api.js           # API fetch utility
│   │   ├── context/             # React context
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── styles.css           # Global styles
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Client dependencies
│
├── server/                       # Express.js back-end
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/             # Route controllers
│   │   ├── postController.js    # Post CRUD operations
│   │   ├── categoryController.js # Category operations
│   │   └── authController.js    # Authentication logic
│   ├── models/                  # Mongoose models
│   │   ├── Post.js              # Post schema
│   │   ├── Category.js          # Category schema
│   │   └── User.js              # User schema
│   ├── routes/                  # API routes
│   │   ├── postRoutes.js        # Post endpoints
│   │   ├── categoryRoutes.js    # Category endpoints
│   │   └── authRoutes.js        # Auth endpoints
│   ├── middleware/             # Custom middleware
│   │   ├── authMiddleware.js    # JWT authentication
│   │   └── errorHandler.js      # Error handling
│   ├── validation/              # Input validation
│   │   ├── postValidation.js    # Post validation rules
│   │   └── categoryValidation.js # Category validation
│   ├── utils/                   # Utility functions
│   │   └── seedCategories.js    # Category seeding
│   ├── uploads/                 # Uploaded images directory
│   ├── server.js                # Main server file
│   └── package.json             # Server dependencies
│
└── README.md                    # This file
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
  - Local: [MongoDB Community Server]
  - Cloud: [MongoDB Atlas]
- **npm** or **yarn**
- **Git**

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd mern-stack-integration-Dtorredo
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Server Configuration

Create a `.env` file in the `server/` directory:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB=mern_blog
JWT_SECRET
```

**For MongoDB Atlas (Cloud):**

```env
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net
MONGO_DB=mern_blog
JWT_SECRET
```

### Client Configuration (Optional)

Create a `.env` file in the `client/` directory (usually not needed):

```env
VITE_API_URL=/api
```

## 🚀 Running the Application

### Step 1: Start MongoDB

**Local MongoDB:**

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Or run directly
mongod
```

**MongoDB Atlas:**

- No local setup needed, just use your connection string in `.env`

### Step 2: Start the Server

Open Terminal 1:

```bash
cd server
npm run dev
```

You should see:

```
MongoDB connected
Seeding default categories...
Default categories created successfully!
Server running on port 5001
```

### Step 3: Start the Client

Open Terminal 2:

```bash
cd client
npm run dev
```

You should see:

```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 4: Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5001/api
- **Health Check:** http://localhost:5001/api/health

## 📚 API Documentation

### Base URL

```
http://localhost:5001/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Derrick",
  "email": "derrick@mail.com",
  "password": "34345N"
}
```

**Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Derrick",
    "email": "derrick@mail.com"
  }
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Post Endpoints

#### Get All Posts

```http
GET /api/posts?page=1&limit=9&search=keyword
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Posts per page (default: 10)
- `search` (optional): Search term for title

#### Get Single Post

```http
GET /api/posts/:id
```

#### Create Post (Auth Required)

```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- title: "Post Title"
- content: "Post content..."
- category: "category_id"
- featuredImage: <file>
```

#### Update Post (Auth Required)

```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Delete Post (Auth Required)

```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

### Category Endpoints

#### Get All Categories

```http
GET /api/categories
```

#### Create Category (Auth Required)

```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Category Name",
  "description": "Optional description"
}
```

## 🎯 Features in Detail

### Authentication System

- **JWT-based authentication** with 7-day token expiration
- **Protected routes** - Only authenticated users can create/edit/delete posts
- **Password hashing** using bcryptjs
- **User sessions** stored in localStorage

### Image Upload

- **Multer** for handling file uploads
- Images stored in `server/uploads/` directory
- Images served at `/uploads/` endpoint
- **Image preview** in create/edit forms
- **Full-size display** in post detail view

### Default Categories

The application automatically seeds these categories on first run:

- **Motorsport** - Posts about racing, cars, and motorsports
- **Tech News** - Latest technology news and updates
- **Blogs** - General blog posts and articles
- **Social Apps** - Posts about social media and applications

### Search & Pagination

- **Real-time search** - Search posts by title as you type
- **Pagination** - Navigate through posts with Previous/Next buttons
- **Page information** - Shows current page, total pages, and post count

### UI Features

- **Dark theme** with #112733 background and #C0FAE6 accent colors
- **Responsive grid** - 3 columns desktop, 2 tablet, 1 mobile
- **Card-based layout** with hover effects
- **Side-by-side post detail** - Text on left, full image on right
- **Create Post card** - Visual card in grid for creating new posts

## 📸 Project Screenshots

_Add screenshots of your application here:_

1. **Home Page** - Post listing with search and pagination
2. **Post Detail** - Full post view with image and content
3. **Create Post** - Form with image upload
4. **Login/Register** - Authentication pages

## 🛠️ Technologies Used

### Frontend

- **React 18.3** - UI library
- **React Router 6** - Client-side routing
- **Vite 5** - Build tool and dev server
- **CSS3** - Styling with custom properties

### Backend

- **Node.js** - Runtime environment
- **Express.js 4** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **express-validator** - Input validation

### Development Tools

- **Nodemon** - Auto-restart server on changes
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

## 🔍 Troubleshooting

### Port Already in Use

If port 5001 is already in use:

```bash
# Find and kill the process
kill -9 $(lsof -ti :5001)

# Or change the port in server/.env
PORT=5002
```

### MongoDB Connection Issues

- **Local MongoDB:** Ensure MongoDB is running (`mongod` or `brew services start mongodb-community`)
- **MongoDB Atlas:** Check your connection string and network access settings
- Verify your `.env` file has the correct `MONGO_URI`

### Images Not Displaying

- Ensure `server/uploads/` directory exists
- Check file permissions
- Verify image URLs in the database

### Categories Not Showing

- Categories are auto-seeded on server start
- Run manually: `cd server && npm run seed:categories`

## 📝 Additional Notes

- The server runs on port **5001** (changed from 5000 to avoid conflicts)
- Images are stored locally in `server/uploads/`
- JWT tokens expire after 7 days
- All API endpoints require authentication except:
  - `GET /api/posts`
  - `GET /api/posts/:id`
  - `GET /api/categories`
  - `POST /api/auth/register`
  - `POST /api/auth/login`

## 👤 Author

Created as part of Week 4 MERN Stack Integration assignment.

---

**Happy Coding! 🚀**
