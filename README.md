🏢 Full Stack Employee Management System (EMS)
A production-ready Full Stack Employee Management System built with the MERN Stack (MongoDB, Express, React, Node.js) and styled using Tailwind CSS.
This system features role-based access control (Admin & Employee), automated attendance tracking, leave request management, automated payslip generation with printable receipts, background scheduling via Inngest, and automated email notifications powered by Nodemailer.
🚀 Features
🔐 Authentication & Role-Based Access Control
JWT-Based Secure Authentication: Token-based authentication with protected routes and middleware.
Role Differentiation:
Admin: Full access to dashboard metrics, employee creation, attendance management, leave approvals, and payroll operations.
Employee: Access to personal profile, attendance log, leave request submission, and payslip viewing/printing.
Admin Seeding: Pre-configured database seed script for initial admin initialization.
👥 Employee Management
Complete CRUD operations for employee records.
Detailed employee profiles, designation tracking, and account status management.
📅 Attendance Management
Real-time check-in and check-out tracking.
Daily/monthly attendance logs with status indicators (Present, Absent, Half-Day, Late).
🏖️ Leave Management System
Request leaves with custom types (Casual, Sick, Maternity/Paternity, etc.).
Admin review pipeline to approve or reject requests with real-time status updates.
💰 Payroll & Payslip Generation
Automated salary slip calculation and generation.
Print-friendly, formatted payslip layout with tax and deduction breakdowns.
Email delivery of payslips directly to employees using Nodemailer.
⚙️ Background Jobs & Integrations
Inngest: Background task scheduling and orchestration (e.g., auto-marking attendance status, scheduled payroll tasks).
CodeRabbit: Integrated AI code review workflows for clean, safe code merges.
🛠️ Tech Stack
Frontend
Framework: React.js (Vite)
Styling: Tailwind CSS
Routing: React Router DOM
HTTP Client: Axios
Icons: Lucide React / React Icons
Backend
Runtime: Node.js
Framework: Express.js
Database: MongoDB (via Mongoose ODM)
Background Jobs: Inngest
Mailing: Nodemailer
Authentication: JSON Web Tokens (JWT) & bcrypt.js
Deployment & CI/CD
Frontend & Backend Hosting: Vercel
Database: MongoDB Atlas
Code Quality: CodeRabbit AI
📂 Project Structure
ems-fullstack/
├── client/                     # Frontend React Application
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Logos, icons, and static assets
│   │   ├── components/         # Reusable UI components (Sidebar, Navbar, Cards)
│   │   ├── pages/              # Views (Dashboard, Attendance, Leaves, Payslips, Settings)
│   │   ├── context/            # Global state & Auth context
│   │   ├── routes/             # App routes & Protected Route guards
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                     # Backend Node.js & Express API
    ├── config/                 # DB Connection & external client setups
    ├── controllers/            # Route controllers (Auth, Employee, Attendance, Leaves, Payroll)
    ├── middleware/             # Auth check & role verification middleware
    ├── models/                 # Mongoose schemas (User, Employee, Attendance, Leave, Payslip)
    ├── routes/                 # Express API endpoints
    ├── inngest/                # Inngest functions and event handlers
    ├── scripts/                # Database seed scripts (e.g., seedAdmin.js)
    ├── server.js               # Entry point
    └── package.json
⚙️ Environment Variables
Create .env files in both the client and server directories.
Server (server/.env)
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ems_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Nodemailer Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Inngest Keys
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Client URL (for CORS)
CLIENT_URL=http://localhost:5173
Client (client/.env)
VITE_API_BASE_URL=http://localhost:5000/api
🏃 Getting Started
Prerequisites
Node.js (v18.x or later)
MongoDB instance (Atlas or local)
Git
1. Clone the Repository
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
2. Backend Setup
cd server
npm install

# Seed the default Admin account
npm run seed:admin

# Start development server
npm run dev
3. Frontend Setup
cd ../client
npm install
npm run dev
The application will be running at http://localhost:5173.
📡 API Reference Overview
Module	Endpoint	Method	Access	Description
Auth	/api/auth/login	POST	Public	Log in user and receive JWT token
Auth	/api/auth/me	GET	Private	Retrieve authenticated user details
Employees	/api/employees	GET / POST	Admin	Fetch all employees / Register new employee
Employees	/api/employees/:id	PUT / DELETE	Admin	Update / Remove an employee record
Attendance	/api/attendance	GET	All	Fetch daily / monthly attendance records
Attendance	/api/attendance/check-in	POST	Employee	Mark attendance clock-in
Leaves	/api/leaves	GET / POST	All	Fetch leave list / Submit leave request
Leaves	/api/leaves/:id/status	PATCH	Admin	Approve or reject leave request
Payroll	/api/payslips	GET / POST	Admin / All	List payslips / Generate new payslip
Dashboard	/api/dashboard/stats	GET	Admin	Fetch analytics and company metrics


🚢 Deployment
Deploying on Vercel
Deploying Backend Server:
Add a vercel.json file in the root of the server folder:
Push to GitHub and import the project into Vercel.
Configure all environment variables in project settings.
Deploying Frontend:
Import the client directory as a separate project in Vercel.
Set build command to npm run build and output directory to dist.
Add VITE_API_BASE_URL pointing to your deployed backend URL.
🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
📄 License
This project is open-source and available under the MIT License.
