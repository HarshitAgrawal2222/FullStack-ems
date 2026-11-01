# Full Stack Employee Management System (EMS)

A production-ready Full Stack Employee Management System built with the MERN Stack (MongoDB, Express, React, Node.js) and styled using Tailwind CSS.

## 🌐 Live Demo & Deployment
- **Live Demo (Admin Portal):** https://full-stack-ems-five.vercel.app/login/admin
- **Client App:** https://full-stack-ems-five.vercel.app

## 🚀 Features

### 🔐 Authentication & Role-Based Access Control
- **JWT-Based Secure Authentication:** Token-based authentication with protected routes and middleware.
- **Role Differentiation:**
  - **Admin:** Full access to dashboard metrics, employee creation, attendance management, leave approvals, and payroll operations.
  - **Employee:** Access to personal profile, attendance log, leave request submission, and payslip viewing/printing.
- **Admin Seeding:** Pre-configured database seed script for initial admin initialization.

### 👥 Employee Management
- Complete CRUD operations for employee records.
- Detailed employee profiles, designation tracking, and account status management.

### 📅 Attendance Management
- Real-time check-in and check-out tracking.
- Daily/monthly attendance logs with status indicators (Present, Absent, Half-Day, Late).

### 🏖️ Leave Management System
- Request leaves with custom types (Casual, Sick, Maternity/Paternity, etc.).
- Admin review pipeline to approve or reject requests with real-time status updates.

### 💰 Payroll & Payslip Generation
- Automated salary slip calculation and generation.
- Print-friendly, formatted payslip layout with tax and deduction breakdowns.
- Email delivery of payslips directly to employees using Nodemailer.

### ⚙️ Background Jobs & Integrations
- **Inngest:** Background task scheduling and orchestration (e.g., auto-marking attendance status, scheduled payroll tasks).
- **CodeRabbit:** Integrated AI code review workflows for clean, safe code merges.

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React / React Icons

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Inngest
- Nodemailer
- JWT & bcrypt.js

**Deployment & CI/CD**
- Vercel
- MongoDB Atlas
- CodeRabbit AI

## 📂 Project Structure


ems-fullstack/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── routes/
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
│
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── inngest/
    ├── scripts/
    ├── server.js
    └── package.json
