# Frontend - Engineering Resource Management System

This folder contains the frontend part of the Engineering Resource Management System project. It is a React application built with TypeScript. The UI is styled using Tailwind CSS and ShadCN UI components. Zustand is used for authentication state, and routing is managed using React Router DOM.

## Features

- Login page for both managers and engineers
- Role-based dashboard views
- Manager can view all engineers, their capacity, and assign them to projects
- Engineer can view their project assignments
- Project listing and assignment listing pages
- Profile page to view user info
- Skill tags and progress bars to show capacity visually
- Sidebar navigation layout for all pages
- Form validation using React Hook Form
- Toast notifications for user actions and errors
- Axios instance with JWT token support

---

## Folder Structure

```
src/
├── components/
│ ├── ui/           # Basic UI elements like Input, Button, Label
│ └── shared/       # Reusable visuals like CapacityBar, SkillTags
├── hooks/          # Custom hooks
├── lib/            # Axios config with token handling
├── pages/          # Login, Dashboards, Assignments, Projects, Profile
├── store/          # Zustand auth store
├── types/          # Global TypeScript interfaces
├── App.tsx         # Routes and protected route logic
└── main.tsx        # Entry point with Toast setup

```

---

## Getting Started

### 1. Navigate to this directory

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run