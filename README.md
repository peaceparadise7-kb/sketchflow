# SketchFlow

SketchFlow is a production-grade full-stack collaborative visual platform designed for engineering teams to diagram distributed systems, map user flows, and transform complex architecture ideas into clear visual specifications.

---

## Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: MongoDB via Mongoose
- **Validation & Security**: Zod, bcryptjs, Helmet, CORS, Morgan
- **Infrastructure**: Custom AppError, Request ID Tracking Middleware, Timestamped Logger

---

## Implemented Features

- [x] **Production Architecture**: Layered, SRP-compliant frontend and backend structure with path aliases (`@/`).
- [x] **Landing Page**: Modern developer-oriented landing page featuring Hero, CSS/HTML Mock Whiteboard, Features, CTA, and Footer.
- [x] **User Registration**: End-to-end user registration flow with Mongoose schema, bcrypt password hashing, and Zod input validation.
- [x] **Duplicate Handling**: Graceful 409 Conflict responses for existing email registrations and MongoDB E11000 duplicate keys.
- [x] **Environment Validation**: Strict fail-fast environment variable validation using Zod schemas.
- [x] **Global Error Pipeline**: Request correlation via `X-Request-Id` and sanitized error payloads (stack traces hidden in production).

---

## Page Screenshots

### Landing Page
> Screenshot coming soon

### Registration Page
> Screenshot coming soon

---

## API Documentation

### System Health
`GET /api/v1/health`
- **Purpose**: Verifies operational backend server status.
- **Response**: `200 OK`

### User Registration
`POST /api/v1/auth/register`
- **Purpose**: Registers a new user account.
- **Payload**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password123!"
  }
  ```
- **Responses**:
  - `201 Created`: Registration successful.
  - `400 Bad Request`: Validation failure (name/email/password rules).
  - `409 Conflict`: Email already registered.

---

## Project Structure

```
sketchflow/
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios client setup & interceptors
│   │   ├── components/   # Layout & Landing subcomponents
│   │   │   ├── landing/  # Hero, MockBoard, FeatureCard, Features, CTA, Footer
│   │   │   └── layout/   # MainLayout & Navbar
│   │   ├── constants/    # Route constants (ROUTES)
│   │   ├── pages/        # Landing, Register, Login, Dashboard, Board, NotFound
│   │   ├── providers/    # App context providers wrapper
│   │   ├── routes/       # Centralized route table (AppRoutes.tsx)
│   │   ├── services/     # Auth API integration services
│   │   ├── types/        # TypeScript interfaces & API response models
│   │   └── utils/        # Utility helper functions
│   ├── package.json
│   └── vite.config.ts
└── backend/
    ├── src/
    │   ├── config/       # Database connection & Zod env validation
    │   ├── constants/    # HTTP status codes
    │   ├── controllers/  # Thin request handlers (health, auth)
    │   ├── middleware/   # Request ID, Error handler, 404 handler
    │   ├── models/       # Mongoose data schemas (User)
    │   ├── routes/       # Versioned API endpoints (/api/v1/)
    │   ├── services/     # Domain business logic (auth, health)
    │   ├── types/        # Custom Express declarations & backend types
    │   ├── utils/        # AppError, asyncHandler, Logger utilities
    │   └── validators/   # Zod payload validation schemas (registerSchema)
    ├── package.json
    └── tsconfig.json
```

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB instance (local or remote)

### 1. Clone & Install Dependencies

```bash
# Install Frontend Dependencies
cd frontend
npm install

# Install Backend Dependencies
cd ../backend
npm install
```

### 2. Environment Configuration

Copy environment template files:

```bash
# Frontend
cp frontend/.env.example frontend/.env

# Backend
cp backend/.env.example backend/.env
```

Ensure required environment variables are set:
- `frontend/.env`:
  - `VITE_API_URL=http://localhost:5000/api/v1`
- `backend/.env`:
  - `PORT=5000`
  - `NODE_ENV=development`
  - `MONGO_URI=mongodb://localhost:27017/sketchflow`

---

## Development & Build Commands

### Frontend
```bash
cd frontend
npm run dev     # Start Vite development server
npm run build   # Compile TypeScript & build production bundle
npm run preview # Preview production build locally
```

### Backend
```bash
cd backend
npm run dev     # Start Express server with ts-node-dev hot reload
npm run build   # Compile TypeScript to dist/
npm start       # Run compiled production server from dist/index.js
```

---

## Project Roadmap

- [x] Production Foundation & Layered Architecture
- [x] Product Landing Page
- [x] User Registration
- [ ] User Login
- [ ] JWT Authentication & Protected Route Guards
- [ ] Dashboard View
- [ ] Board Management
- [ ] Infinite Canvas Whiteboard

---

## Changelog

### v0.2
- Added product Landing Page with CSS/HTML Mock Whiteboard and feature highlights.
- Added Mongoose `User` model with lowercase/unique email and hidden password field (`select: false`).
- Added user registration endpoint (`POST /api/v1/auth/register`).
- Added Zod input validation for registration payload.
- Added bcrypt password hashing.
- Added `409 Conflict` duplicate email error handling and MongoDB `E11000` key safety.
- Added dark mode Registration UI page with form state handling and redirect UX.

### v0.1
- Initialized project foundation with React, Vite, Express, TypeScript, and Mongoose.
- Configured path aliases (`@/`), centralized Zod environment validation, Request ID middleware, and global error handling.
