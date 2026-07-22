# SketchFlow

SketchFlow is a production-grade full-stack collaborative visual platform workspace foundation.

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
- **Security & Utilities**: Helmet, CORS, Morgan, Zod, Custom Error Handler, Logger

---

## Project Structure

```
sketchflow/
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios client setup
│   │   ├── components/   # UI & Layout components
│   │   ├── constants/    # Route & app constants
│   │   ├── pages/        # Route page views
│   │   ├── providers/    # App context providers
│   │   ├── routes/       # Centralized route definitions
│   │   ├── types/        # TypeScript models & types
│   │   └── utils/        # Pure helper utilities
│   ├── package.json
│   └── vite.config.ts
└── backend/
    ├── src/
    │   ├── config/       # Database & Zod env validation
    │   ├── constants/    # HTTP status codes
    │   ├── controllers/  # Request handlers
    │   ├── middleware/   # Request ID, Error, 404 middleware
    │   ├── routes/       # Versioned API endpoints (/api/v1/)
    │   ├── services/     # Core domain business logic
    │   ├── types/        # TypeScript module declarations & types
    │   └── utils/        # Logger & AppError utilities
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

Ensure environment variables are configured:
- `frontend/.env`: `VITE_API_URL=http://localhost:5000/api/v1`
- `backend/.env`: `PORT=5000`, `NODE_ENV=development`, `MONGO_URI=mongodb://localhost:27017/sketchflow`

---

## Development & Build Commands

### Frontend
```bash
cd frontend
npm run dev     # Start development server
npm run build   # Compile TypeScript & build bundle
npm run preview # Preview production build
```

### Backend
```bash
cd backend
npm run dev     # Start backend with hot reload
npm run build   # Compile TypeScript to dist/
npm start       # Run compiled production server
```

---

## Current Development Status

- **Status**: Production Foundation Initialized
- Clean layered architecture established for both frontend and backend.
- End-to-end TypeScript strict mode enabled with path alias (`@/`) support.
- Centralized Zod environment validation, Request ID tracking, and global error handling configured.
