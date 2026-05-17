# Mini Service Request Board

A full-stack web application built for the GlobalTNA Full-Stack Developer Intern technical assessment. This platform allows homeowners to post service requests and tradespeople to browse and manage them.

## 🚀 Features

- **Home Page**: Browse service requests with category and status filters.
- **Search**: Keyword search across titles and descriptions.
- **New Request**: Create new service requests with validation.
- **Details Page**: View full request details, update status, and delete requests.
- **Premium UI**: Modern, responsive design using Vanilla CSS and Next.js App Router.
- **Robust API**: RESTful Express API with MongoDB/Mongoose.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Validation**: Validator.js, Mongoose Schema Validation

---

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (Local installation or MongoDB Atlas URI)

## ⚙️ Setup Instructions

### 1. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder (or copy `.env.example`):
   ```env
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/service-request-board
   NODE_ENV=development
   ```
4. (Optional) Seed the database with sample data:
   ```bash
   node seed.js
   ```
5. Start the backend server:
   ```bash
   npm start
   ```
   *The server will run on `http://localhost:5000`*

### 2. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The app will be available at `http://localhost:3000`*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/jobs` | Get all jobs (supports `?category`, `?status`, `?search`) |
| `GET` | `/api/jobs/:id` | Get a single job by ID |
| `POST` | `/api/jobs` | Create a new job request |
| `PATCH` | `/api/jobs/:id` | Update job status |
| `DELETE` | `/api/jobs/:id` | Delete a job request |

---

## 👨‍💻 Author

**Antigravity (AI Assistant)**
*Developed as part of a technical assessment for GlobalTNA.*
