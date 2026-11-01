# FullStack EMS

A full-stack Employee Management System built with React on the frontend and Express + MongoDB on the backend. The application supports both admin and employee workflows including login, employee management, attendance tracking, leave requests, payslips, and dashboard analytics.

## Features

- Admin and employee portal login
- Employee directory with add, update, and soft-delete functionality
- Attendance management
- Leave application tracking
- Payslip generation and printable payslip view
- Dashboard summary for key HR metrics
- Profile and password management
- JWT-based authentication with protected routes

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- React Hot Toast
- Tailwind CSS (via Vite plugin)

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Multer for file/form-data handling
- Inngest integration

## Project Structure


FullStack-ems/
├── client/                 # React frontend
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
├── server/                 # Express backend
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── inngest/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── vercel.json
├── .gitignore
├── README.md
└── package-lock.json


## Prerequisites

Before running the project, make sure you have:

- Node.js (v18+ recommended)
- npm
- MongoDB instance or MongoDB Atlas connection
- A JWT secret for authentication

## Environment Setup

Create a `.env` file inside the `server` directory with:

PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


The frontend uses the backend API base URL via the app configuration and Axios calls.

## Installation

### 1. Install frontend dependencies


cd client
npm install


### 2. Install backend dependencies

bash
cd server
npm install


## Running the Application

### Start the backend

bash
cd server
npm start


or for development:

bash
cd server
npm run server


### Start the frontend

bash
cd client
npm run dev


The frontend runs on Vite’s dev server, typically on:

bash
http://localhost:5173


The backend runs on:

bash
http://localhost:4000


## Available Scripts

### Client
bash
npm run dev
npm run build
npm run preview
npm run lint


### Server
bash
npm start
npm run server
npm run seed


## Main API Modules

The backend exposes routes under the following areas:

- `/api/auth` — login, session, change password
- `/api/employees` — employee CRUD operations
- `/api/profile` — profile-related actions
- `/api/attendance` — attendance handling
- `/api/leaves` — leave requests and approvals
- `/api/payslips` — payslip operations
- `/api/dashboard` — dashboard metrics

## Notes

- The admin login is intentionally simplified in the backend and does not require a stored admin user.
- `seed.js` can be used to initialize sample data for local development.
- The app includes both protected admin routes and employee-specific actions.

## License

This project is provided as-is for educational and portfolio use.

## Author

Harshit Agrawal


