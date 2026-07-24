# SketchFlow

A modern infinite collaborative whiteboard inspired by Excalidraw, tldraw, and FigJam, built with a premium optical-glass design language.

SketchFlow provides an infinite spatial canvas for visual thinking, wireframing, brainstorming, and real-time team collaboration. Built with performance and minimal UI aesthetics in mind, it combines smooth vector rendering with a calm, high-contrast dark theme.

---

## Features

- **Infinite Canvas**: Unlimited spatial canvas with smooth pan and zoom navigation.
- **Real-Time Collaboration**: Multi-user workspace with sub-second state updates and cursor synchronization.
- **Smart Shape Connectors**: Dynamic anchor points (`top`, `right`, `bottom`, `left`) that remain locked to bounding boxes during object drag and resize operations.
- **Essential Drawing Primitives**: Clean set of core tools including Select, Rectangle, Ellipse, Diamond, Line, Arrow, Text, and Sticky Notes.
- **Selection & Manipulations**: Multi-object selection, corner resize handles, drag transformations, and duplication.
- **Undo / Redo History**: Full history stack for reverting and reapplying canvas operations.
- **Export Capabilities**: High-resolution vector export for embedding into documentation.
- **Authentication System**: Secure user sign-up, sign-in, and session token management.
- **Optical Glass Design System**: Smoked glass panels, specular edge highlights, and visionOS-inspired backdrop blurs.
- **Aurora Background & Grid**: Ambient green gradient streams layered beneath a subtle engineering dot grid.

---

## Screenshots

### Landing Page
![Landing Page](assets/screenshots/landing-page.png)

### Canvas Editor
![Canvas Editor](assets/screenshots/editor.png)

### Dashboard
![Dashboard](assets/screenshots/dashboard.png)

### Authentication
![Authentication](assets/screenshots/auth.png)

---

## Tech Stack

### Frontend
| Technology | Role |
|---|---|
| **React 18** | UI component architecture |
| **TypeScript** | Static typing and interface contracts |
| **Vite** | Fast development server and production bundler |
| **Tailwind CSS** | Utility-first design system and optical glass styling |
| **React Router DOM v7** | Client-side route management |
| **Axios** | HTTP client for REST API communication |

### Backend
| Technology | Role |
|---|---|
| **Node.js & Express** | RESTful HTTP server application |
| **TypeScript** | End-to-end type safety |
| **MongoDB & Mongoose** | Document database and object data modeling |
| **Zod** | Schema validation for environment and payloads |
| **JWT & bcryptjs** | Authentication token generation and password hashing |
| **Helmet & CORS** | Security headers and cross-origin resource sharing |

---

## Project Structure

```
sketchflow/
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios HTTP client configuration and interceptors
│   │   ├── components/   # UI components, layout wrappers, background effects
│   │   │   ├── background/ # Aurora video, canvas, engineering grid
│   │   │   ├── landing/    # Navbar, Hero, InteractiveLandingCanvas, Features, CTA, Footer
│   │   │   ├── layout/     # MainLayout, AuthLayout
│   │   │   └── ui/         # GlassButton, GlassCard, GlassHeader, GlassInput
│   │   ├── constants/    # Route paths and app constants
│   │   ├── pages/        # Landing, Login, Register, Dashboard, Board, NotFound
│   │   ├── routes/       # Route table (AppRoutes.tsx)
│   │   ├── services/     # Auth API integration services
│   │   └── types/        # Shared TypeScript interfaces
│   ├── package.json
│   └── vite.config.ts
└── backend/
    ├── src/
    │   ├── config/       # Database connection & Zod environment validation
    │   ├── controllers/  # API endpoint handlers
    │   ├── middleware/   # Request ID, error handler, authentication guards
    │   ├── models/       # Mongoose data schemas (User)
    │   ├── routes/       # Versioned API router (/api/v1/)
    │   ├── services/     # Domain business logic
    │   └── validators/   # Payload validation schemas
    ├── package.json
    └── tsconfig.json
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas cluster URI

### 1. Clone the Repository

```bash
git clone https://github.com/peaceparadise7-kb/sketchflow.git
cd sketchflow
```

### 2. Install Dependencies

Install packages for both frontend and backend workspace packages:

```bash
# Install Frontend Dependencies
cd frontend
npm install

# Install Backend Dependencies
cd ../backend
npm install
```

### 3. Environment Setup

Copy example environment configuration files:

```bash
# Frontend environment
cp frontend/.env.example frontend/.env

# Backend environment
cp backend/.env.example backend/.env
```

Configure your environment variables:

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

**`backend/.env`**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/sketchflow
JWT_SECRET=your_development_jwt_secret_key
```

### 4. Running the Application

Start the backend API server and frontend development client:

```bash
# Start Backend Development Server (Port 5000)
cd backend
npm run dev

# Start Frontend Development Server (Port 5173)
cd frontend
npm run dev
```

### 5. Production Build

To compile TypeScript and create production bundles:

```bash
# Build Frontend
cd frontend
npm run build

# Build Backend
cd backend
npm run build
npm start
```

---

## Roadmap

### Completed
- [x] Product landing page redesign with optical glass aesthetic
- [x] Smoked optical glass interactive demo board
- [x] User registration & sign-in API integration
- [x] Global Aurora background and engineering grid layering
- [x] Routing hierarchy and standalone auth layout isolation
- [x] Smart shape anchor locking (`top`, `right`, `bottom`, `left`)

### In Progress
- [ ] Real-time canvas cursor synchronization
- [ ] Multi-object selection marquee box
- [ ] Vector object export options (PNG / SVG)
- [ ] History stack undo/redo persistent state

### Planned
- [ ] Live multiplayer presence and audio/text chat
- [ ] Version history and canvas rollback
- [ ] Threaded comments and annotations
- [ ] Whiteboard template library
- [ ] Mobile touch & pen gesture optimization

---

## Design Philosophy

SketchFlow relies on a calm, unobtrusive visual hierarchy built around five core design pillars:

1. **Optical Glass Material**: Multi-layered dark glass panels with 30px+ backdrop blur, top specular edge highlights, and subtle inset shadows.
2. **Aurora Background**: Soft, ambient green gradient stream that diffuses beneath semi-transparent glass layers.
3. **Engineering Grid**: Faint dot grid pattern providing subtle alignment anchors without cluttering visual thoughts.
4. **Minimal UI Chrome**: Toolbars, zoom controls, and menus float as compact glass capsules, maximizing active canvas area.
5. **High-Contrast Dark Theme**: Deep black base (`#050505`) with crisp white strokes and emerald highlights to prevent eye fatigue.

---

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request with a clear summary of changes.

---

## License

Distributed under the MIT License. See `LICENSE` for more details.
