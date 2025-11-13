# 🚀 Setup and Running Guide

## ✅ Implementation Status vs Requirements

### Task 1: Project Setup ✅

- ✅ Clear directory structure (client/server)
- ✅ MongoDB connection with Mongoose
- ✅ Express.js server with middleware
- ✅ React front-end with Vite
- ✅ Proxy configured for API calls
- ✅ Environment variables setup

### Task 2: Back-End Development ✅

- ✅ All required API endpoints implemented:
  - `GET /api/posts` ✅
  - `GET /api/posts/:id` ✅
  - `POST /api/posts` ✅
  - `PUT /api/posts/:id` ✅
  - `DELETE /api/posts/:id` ✅
  - `GET /api/categories` ✅
  - `POST /api/categories` ✅
- ✅ Mongoose models (Post, Category, User)
- ✅ Input validation (express-validator)
- ✅ Error handling middleware

### Task 3: Front-End Development ✅

- ✅ Post list view
- ✅ Single post view
- ✅ Create/edit post form
- ✅ Navigation and layout
- ✅ React Router
- ✅ React hooks (useState, useEffect, useContext)
- ✅ Custom hooks (usePosts, useCategories)

### Task 4: Integration and Data Flow ✅

- ✅ API service in React
- ✅ State management for posts and categories
- ✅ Forms with validation
- ✅ Loading and error states

### Task 5: Advanced Features ✅

- ✅ User authentication (register, login, protected routes)
- ✅ Image uploads for featured images
- ✅ Pagination for post list
- ✅ Searching functionality
- ⚠️ Comments feature (model added, but UI not fully implemented)

**Note:** The assignment requires "at least one advanced feature" - we have implemented 4 out of 5, which exceeds the requirement.

---

## 📋 Prerequisites

1. **Node.js** (v18 or higher)

   - Check: `node --version`
   - Download: https://nodejs.org/

2. **MongoDB** (local installation or MongoDB Atlas)

   - Local: https://www.mongodb.com/try/download/community
   - Atlas (cloud): https://www.mongodb.com/cloud/atlas

3. **MongoDB Compass** (optional, for GUI)
   - Download: https://www.mongodb.com/try/download/compass

---

## 🔧 Step-by-Step Setup

### 1. Install Dependencies

**Server:**

```bash
cd server
npm install
```

**Client:**

```bash
cd client
npm install
```

### 2. Configure Environment Variables

**Server (.env file in `/server` directory):**

Create a file named `.env` in the `server` folder with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB=mern_blog
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**For MongoDB Atlas (cloud):**

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net
MONGO_DB=mern_blog
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Client (.env file in `/client` directory - optional):**

Create a file named `.env` in the `client` folder (only if you need to override):

```env
VITE_API_URL=/api
```

---

## 🗄️ Connecting to MongoDB with Compass

### Option 1: Local MongoDB

1. **Start MongoDB locally:**

   ```bash
   # macOS (if installed via Homebrew)
   brew services start mongodb-community

   # Or run directly
   mongod
   ```

2. **Connect in Compass:**
   - Open MongoDB Compass
   - Connection string: `mongodb://127.0.0.1:27017`
   - Click "Connect"
   - You should see your databases, including `mern_blog` once the app runs

### Option 2: MongoDB Atlas (Cloud)

1. **Create a MongoDB Atlas account:**

   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create a cluster:**

   - Click "Build a Database"
   - Choose free tier (M0)
   - Select a region
   - Create cluster

3. **Set up database access:**

   - Go to "Database Access"
   - Add a new database user
   - Save username and password

4. **Set up network access:**

   - Go to "Network Access"
   - Add IP address: `0.0.0.0/0` (for development) or your specific IP

5. **Get connection string:**

   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Use this in your `.env` file as `MONGO_URI`

6. **Connect in Compass:**
   - Open MongoDB Compass
   - Paste the connection string (with password replaced)
   - Click "Connect"

---

## 🚀 Running the Application

### Start MongoDB (if using local)

```bash
# macOS with Homebrew
brew services start mongodb-community

# Or run directly
mongod
```

### Start the Server

Open Terminal 1:

```bash
cd server
npm run dev
```

You should see:

```
MongoDB connected
Server running on port 5001
```

### Start the Client

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

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5001/api
- **Health Check:** http://localhost:5001/api/health

---

## 🧪 Testing the Application

1. **Register a new user:**

   - Go to http://localhost:5173/register
   - Create an account

2. **Login:**

   - Go to http://localhost:5173/login
   - Login with your credentials

3. **Create a category:**

   - You'll need to create categories first (via API or add UI)
   - Or use the API directly: `POST /api/categories` with `{ "name": "Technology" }`

4. **Create a post:**

   - Click "New Post"
   - Fill in title, content, select category
   - Optionally upload an image
   - Submit

5. **View posts:**
   - Home page shows all posts
   - Click "Read More" to see details
   - Use search to filter posts

---

## 📊 Viewing Data in MongoDB Compass

1. **Open MongoDB Compass**
2. **Connect to your database** (local or Atlas)
3. **Navigate to `mern_blog` database**
4. **You'll see collections:**

   - `users` - User accounts
   - `posts` - Blog posts
   - `categories` - Post categories

5. **Browse and edit data:**
   - Click on any collection to view documents
   - You can add, edit, or delete documents directly in Compass

---

## 🐛 Troubleshooting

### Server won't start

- Check if MongoDB is running: `mongosh` or check Compass connection
- Verify `.env` file exists and has correct values
- Check if port 5000 is available: `lsof -i :5000`

### Client won't start

- Check if port 5173 is available
- Verify `node_modules` are installed: `npm install`

### MongoDB connection fails

- Verify MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings (Atlas)
- Verify database user credentials

### Images not uploading

- Ensure `server/uploads` directory exists
- Check file permissions
- Verify multer configuration

---

## 📝 Next Steps

1. Add screenshots to README.md
2. Implement comments UI (model is ready)
3. Add more advanced features if desired
4. Deploy to production (Heroku, Vercel, etc.)
