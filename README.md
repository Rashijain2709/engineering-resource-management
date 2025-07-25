# Engineering Resource Management System

This is a full-stack application to manage engineers and their allocation across projects. The system helps managers assign engineers based on skills and availability and provides dashboards for both managers and engineers.

---

## Features

### Authentication and Roles

- Login with JWT authentication
- Manager and Engineer roles with protected routes
- Role-based dashboards

### Manager Capabilities

- View all engineers and their current capacity
- Create projects and assign engineers
- Filter by skills and track team load
- View assignments and project statuses

### Engineer Capabilities

- View personal profile and workload
- See assigned projects with duration and roles

### Additional Features

- Skill tags and filtering for engineer and project matching
- Responsive UI with sidebar layout
- Toast notifications for feedback
- Form validation using React Hook Form
- Dashboard views for workload and availability

---

## Technology Stack

### Frontend

- React with TypeScript
- Tailwind CSS
- Zustand (state management)
- ShadCN UI components
- React Hook Form
- React Toastify

### Backend

- Node.js with Express and TypeScript
- MongoDB with Mongoose
- JWT authentication
- REST API with modular routing

---

## Folder Structure

```
engineering-resource-management/
├── client/             # React frontend
│ └── README.md
├── server/             # Node.js + Express backend
│ ├── src/
│ ├── .env
│ └── package.json
├── README.md           # Root-level README   

```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Rashijain2709/engineering-resource-management.git

cd engineering-resource-management
```

---

### 2. Setup the Client

```bash
cd client

npm install

npm start
```

---

### 3. Setup the Server

```bash
cd server

npm install

npm run dev
```

##### To seed dummy data:

```bash
npx ts-node src/utils/seed.ts
```

---

## AI usage report

- To brainstorm component structure and naming conventions
- To help write boilerplate code faster (e.g., basic form setup, routing patterns)
- To troubleshoot bugs and syntax errors more efficiently

---
