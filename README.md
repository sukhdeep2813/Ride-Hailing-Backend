# 🚗 Ride-Hailing Backend

A full-stack ride-hailing application (in development) enabling riders to book trips and drivers to accept them. Built with **Node.js + Express** backend and **React + Vite** frontend, featuring real-time mapping, fare calculation, and Google OAuth authentication.

⚠️ **Status:** Project is currently under active development. Some features are incomplete or still being implemented.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Architecture](#project-architecture)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Component Overview](#component-overview)
- [Authentication Flow](#authentication-flow)
- [Development Status](#development-status)
- [Known Issues & TODOs](#known-issues--todos)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

**Ride-Hailing Backend** is a web-based ride-hailing platform prototype that demonstrates:
- User authentication with email/password and Google OAuth 2.0
- Interactive map-based ride booking for riders
- Ride acceptance interface for drivers
- Real-time fare calculation based on distance
- Ride history and profile management
- Role-based access control (Rider, Driver, Admin)

This is a **work-in-progress** learning project exploring full-stack JavaScript development with modern tools and best practices.

---

## ✨ Features

### ✅ Implemented
- **User Authentication**
  - Email/password signup and login with bcrypt hashing
  - Google OAuth 2.0 integration with Passport.js
  - Session management with express-session
  - Role-based user system (RIDER, DRIVER, ADMIN)

- **Rider Functionality**
  - Google Maps integration for location selection
  - Real-time pickup/dropoff input with autocomplete
  - Fare estimation display before booking
  - Ride booking submission
  - Ride history view with status tracking
  - User profile management and ratings

- **Driver Functionality**
  - Driver dashboard to view available rides
  - Ride acceptance interface
  - Basic driver profile setup

- **Shared Features**
  - Ride status management (PENDING → ACCEPTED → ONGOING → COMPLETED)
  - User rating system (5.0 scale)
  - Settings page
  - Responsive UI with Tailwind CSS

### 🚧 In Progress / Incomplete
- [ ] Real-time ride tracking (WebSocket connection ready but not implemented)
- [ ] Live driver location updates
- [ ] Payment integration (Payments page is a stub)
- [ ] Notification system
- [ ] Complete fare calculation algorithm
- [ ] Driver acceptance workflow
- [ ] Emergency SOS feature
- [ ] Full error handling and validation
- [ ] Unit and integration tests
- [ ] Docker setup for containerization

### ❌ Not Yet Started
- [ ] Production deployment
- [ ] Admin dashboard
- [ ] Analytics dashboard
- [ ] Referral system
- [ ] Advanced surge pricing
- [ ] Mobile app
- [ ] Third-party payment gateway integration

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js 18+ with ES6 modules
- **Framework:** Express.js 5.2.1
- **Database:** PostgreSQL (Neon Serverless) via Prisma ORM 7.8.0
- **Authentication:** 
  - Passport.js with Google OAuth 2.0 strategy
  - bcrypt for password hashing
  - JSON Web Tokens (JWT)
  - express-session for session management
- **Real-time:** WebSockets (ws library) - infrastructure ready
- **Environment:** dotenv for configuration
- **Dev Tools:** Nodemon for auto-reload

**Key Dependencies:**
```json
{
  "express": "^5.2.1",
  "@prisma/client": "^7.8.0",
  "@prisma/adapter-neon": "^7.8.0",
  "@neondatabase/serverless": "^1.1.0",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "bcrypt": "^6.0.0",
  "jsonwebtoken": "^9.0.3",
  "express-session": "^1.19.0",
  "cors": "^2.8.6",
  "dotenv": "^17.4.1",
  "ws": "^8.20.0"
}
```

### Frontend
- **Framework:** React 19.2.4 with ES6 modules
- **Build Tool:** Vite 8.0.4 (blazing fast development server)
- **Routing:** React Router DOM 7.14.1 with nested routes
- **Styling:** Tailwind CSS 4.2.2 + custom components
- **Icons:** Lucide React 1.14.0 (SVG icon library)
- **Maps:** Google Maps JavaScript API via @vis.gl/react-google-maps 1.8.3
- **Authentication:** @react-oauth/google 0.13.5
- **Notifications:** react-hot-toast 2.6.0 for toast alerts
- **State Management:** React Context API for user profile and auth
- **Dev Tools:** ESLint for code quality

**Key Dependencies:**
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^7.14.1",
  "vite": "^8.0.4",
  "tailwindcss": "^4.2.2",
  "@vis.gl/react-google-maps": "^1.8.3",
  "@react-oauth/google": "^0.13.5",
  "react-hot-toast": "^2.6.0",
  "lucide-react": "^1.14.0"
}
```

---

## 📁 Project Structure

```
Ride-Hailing-Backend/
│
├── server/                                Backend application (Node.js + Express)
│   ├── src/
│   │   ├── server.js                     Express app setup, middleware config, route mounting
│   │   │                                 - CORS configured for http://localhost:5173
│   │   │                                 - Session + Passport middleware
│   │   │                                 - Routes: /api/auth, /api/rides, /api/fare, /api/create
│   │   │
│   │   ├── config/
│   │   │   ├── db.js                     Prisma client with Neon serverless adapter
│   │   │   │                             - Database connection management
│   │   │   │                             - WebSocket constructor setup
│   │   │   │
│   │   │   └── passport.js               Google OAuth 2.0 strategy configuration
│   │   │                                 - User lookup/creation on OAuth callback
│   │   │                                 - Session serialization/deserialization
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js         [PARTIAL] User authentication logic
│   │   │   │                             - Signup with validation
│   │   │   │                             - Login with password check
│   │   │   │                             - Profile fetching
│   │   │   │                             - TODO: Update profile, password reset
│   │   │   │
│   │   │   ├── rideController.js         [PARTIAL] Ride management
│   │   │   │                             - Create ride request
│   │   │   │                             - Accept ride (driver)
│   │   │   │                             - Complete ride
│   │   │   │                             - TODO: Real-time updates, cancellation
│   │   │   │
│   │   │   ├── fareController.js         [PARTIAL] Fare calculation
│   │   │   │                             - Basic distance-based calculation
│   │   │   │                             - TODO: Surge pricing, vehicle type multipliers
│   │   │   │
│   │   │   └── rideHistoryController.js  [PARTIAL] Ride history retrieval
│   │   │                                 - Get user rides with filtering
│   │   │                                 - TODO: Pagination, advanced filters
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoute.js              POST /api/auth/signup, /login, GET /profile
│   │   │   ├── rideRoute.js              POST /api/rides/create, /accept, GET /history
│   │   │   └── fareRoute.js              POST /api/fare/calculate
│   │   │
│   │   └── middlewares/                  [TODO] Authentication & error handling
│   │       - Auth validation middleware (incomplete)
│   │       - Error handling middleware (incomplete)
│   │       - Request logging (not started)
│   │
│   ├── prisma/
│   │   ├── schema.prisma                 Database schema definition
│   │   │                                 - User model (UUID, email, OAuth, role, rating)
│   │   │                                 - Ride model (status, locations, fare, distance, duration)
│   │   │                                 - Enums: Role (RIDER, DRIVER, ADMIN)
│   │   │                                 - Enums: RideStatus (PENDING, ACCEPTED, ONGOING, COMPLETED, CANCELLED)
│   │   │
│   │   └── generated/                    Auto-generated Prisma client (do not edit)
│   │
│   ├── package.json
│   ├── .env.example                      Example environment variables
│   ├── Dockerfile                        [EMPTY] Ready for Docker setup
│   └── .gitignore
│
├── client/                               Frontend application (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx               [COMPLETE] Public landing page with hero
│   │   │   ├── Login.jsx                 [COMPLETE] Email/password + Google OAuth login
│   │   │   ├── SignUp.jsx                [COMPLETE] User registration form
│   │   │   ├── DashBoard.jsx             [COMPLETE] Authenticated layout wrapper with Outlet
│   │   │   ├── MapDashboard.jsx          [PARTIAL] Rider main interface
│   │   │   │                             - Shows map + booking widget
│   │   │   │                             - TODO: Real-time driver positions
│   │   │   │
│   │   │   ├── DriverDashboard.jsx       [IN PROGRESS] Driver interface
│   │   │   │                             - Shows available rides
│   │   │   │                             - TODO: Accept ride flow, live updates
│   │   │   │
│   │   │   ├── History.jsx               [PARTIAL] Ride history page
│   │   │   │                             - Lists past rides with status
│   │   │   │                             - TODO: Detailed view, filtering, sorting
│   │   │   │
│   │   │   ├── Profile.jsx               [PARTIAL] User profile management
│   │   │   │                             - View/edit basic info, ratings
│   │   │   │                             - TODO: Vehicle details, emergency contacts
│   │   │   │
│   │   │   ├── Setting.jsx               [PARTIAL] App settings
│   │   │   │                             - Notification preferences
│   │   │   │                             - TODO: Privacy settings, language, theme
│   │   │   │
│   │   │   └── Payments.jsx              [STUB] Payment management
│   │   │                                 - Empty placeholder
│   │   │                                 - TODO: Payment method management, transaction history
│   │   │
│   │   ├── components/
│   │   │   ├── MapContainer.jsx          [PARTIAL] Google Maps integration
│   │   │   │                             - Map rendering with markers
│   │   │   │                             - Location autocomplete
│   │   │   │                             - Geolocation detection
│   │   │   │                             - TODO: Real-time driver tracking
│   │   │   │
│   │   │   ├── RideBookingWidget.jsx     [PARTIAL] Ride booking form
│   │   │   │                             - Pickup/dropoff input
│   │   │   │                             - Vehicle type selection
│   │   │   │                             - Fare display
│   │   │   │                             - Request button
│   │   │   │                             - TODO: Payment method selection, special requests
│   │   │   │
│   │   │   ├── MapDirectionsRenderer.jsx [PARTIAL] Route visualization
│   │   │   │                             - Route drawing between pickup/dropoff
│   │   │   │                             - Distance & duration display
│   │   │   │                             - TODO: Alternative routes
│   │   │   │
│   │   │   ├── NavBar.jsx                [COMPLETE] Top navigation bar
│   │   │   ├── SideBar.jsx               [COMPLETE] Left sidebar with menu
│   │   │   ├── HeroSection.jsx           [COMPLETE] Landing page hero section
│   │   │   ├── Glassmorphism.jsx         [COMPLETE] Reusable glass-effect card
│   │   │   └── Footer.jsx                [COMPLETE] Footer component
│   │   │
│   │   ├── context/
│   │   │   └── LayoutContext.jsx         [PARTIAL] Global user state management
│   │   │                                 - Profile loading on app init
│   │   │                                 - Auth state (logged in/out)
│   │   │                                 - TODO: Role-based rendering context
│   │   │
│   │   ├── api/                          [TODO] API service layer
│   │   │   - Centralized API calls (not started)
│   │   │   - Request/response interceptors
│   │   │
│   │   ├── hooks/                        [TODO] Custom React hooks
│   │   │   - useAuth, useRide, useFare hooks
│   │   │
│   │   ├── utils/                        [TODO] Helper functions
│   │   │   - Validators, formatters, converters
│   │   │
│   │   ├── assets/                       [EMPTY] Images, icons, static files
│   │   ├── App.jsx                       [COMPLETE] Routes definition
│   │   │                                 - Landing, Login, SignUp
│   │   │                                 - Protected Dashboard with nested routes
│   │   │                                 - Role-based component rendering
│   │   │
│   │   ├── main.jsx                      React DOM entry point
│   │   ├── index.css                     Global Tailwind styles
│   │   └── App.css                       [EMPTY] App-level styles
│   │
│   ├── public/                           [EMPTY] Static assets directory
│   ├── vite.config.js                    Vite development server configuration
│   ├── tailwind.config.js                Tailwind CSS configuration
│   ├── eslint.config.js                  ESLint rules for code quality
│   ├── index.html                        HTML entry point
│   ├── package.json
│   ├── Dockerfile                        [EMPTY] Ready for Docker setup
│   └── .gitignore
│
├── docker-compose.yml                    [EMPTY] Ready for multi-container orchestration
└── .gitignore

```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **yarn** 3+
- **PostgreSQL** instance or **Neon** serverless account (free tier available)
- **Google Cloud Project** with OAuth 2.0 credentials
  - [Get Google OAuth Credentials](https://console.cloud.google.com/)

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the `server/` directory:
   ```env
   # Database Connection (Neon PostgreSQL)
   DATABASE_URL=postgresql://user:password@neon.tech/database_name

   # Server Configuration
   PORT=5000
   SESSION_SECRET=your_random_secure_session_secret_here_min_32_chars

   # Google OAuth 2.0 Credentials
   VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
   VITE_GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

   # Frontend URL (for CORS)
   CLIENT_URL=http://localhost:5173
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Push Database Schema:**
   ```bash
   npx prisma db push
   ```
   This creates `User` and `Ride` tables in your PostgreSQL database.

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the `client/` directory:
   ```env
   # Backend API URL
   VITE_API_URL=http://localhost:5000/api

   # Google OAuth Client ID (same as backend)
   VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
   ```

---

## ▶️ Running the Application

### Development Mode

Open **two terminal windows**:

**Terminal 1 - Start Backend:**
```bash
cd server
npm run server
```
✅ Backend runs on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
✅ Frontend runs on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

**Backend:**
```bash
cd server
npm run build  # (script not configured yet)
```

**Frontend:**
```bash
cd client
npm run build
npm run preview  # Preview production build locally
```

---

## 🏗️ Project Architecture

### High-Level Data Flow

```
[React Frontend] 
      ↓
   [REST API]
      ↓
[Express Server] → [Prisma ORM] → [PostgreSQL Database]
      ↓
[Google OAuth / Passport]
      ↓
[Session Management]
```

### Component Interaction Flow

```
Landing Page (unauthenticated)
        ↓
   Login / SignUp
        ↓
   Dashboard (authenticated)
        ├── Rider Path: MapDashboard → Book Ride → History
        ├── Driver Path: DriverDashboard → Accept Ride
        └── Shared: Profile, Settings, Payments (stub)
```

### Authentication Flow

1. User visits `/login` or `/signup`
2. **Option A (Email/Password):**
   - Submit form → Backend validates → bcrypt comparison → Session created
3. **Option B (Google OAuth):**
   - Click "Login with Google" → Google consent screen
   - Backend receives OAuth code → Exchange for tokens → Create/find user → Session created
4. User redirected to `/dashboard`
5. `LayoutContext` fetches user profile and stores globally
6. Protected routes render based on `profile.role` (RIDER/DRIVER)

### Ride Booking Flow

1. Rider enters pickup/dropoff on map
2. Frontend calls `/api/fare/calculate` → displays estimated fare
3. Rider clicks "Request Ride" → POST `/api/rides/create`
4. Ride created in database with status `PENDING`
5. **[TODO]** Real-time notification sent to drivers via WebSocket
6. **[TODO]** Driver accepts ride → status changes to `ACCEPTED`
7. **[TODO]** Real-time tracking begins
8. Ride marked `COMPLETED` when destination reached

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth/*`)

| Method | Endpoint | Body | Response | Status |
|--------|----------|------|----------|--------|
| `POST` | `/signup` | `{email, password, name, role}` | `{userId, message}` | ✅ Working |
| `POST` | `/login` | `{email, password}` | `{userId, message}` | ✅ Working |
| `GET` | `/google` | - | Redirects to Google consent | ✅ Working |
| `GET` | `/google/callback` | - | Redirects to dashboard | ✅ Working |
| `GET` | `/profile` | - | `{id, email, name, role, rating, avatar}` | ✅ Working |
| `PUT` | `/profile` | `{name, phone, avatar}` | `{updated user}` | 🚧 Partial |
| `POST` | `/logout` | - | `{message}` | ⏳ Not tested |

### Ride Routes (`/api/rides/*` and `/api/create/*`)

| Method | Endpoint | Body | Response | Status |
|--------|----------|------|----------|--------|
| `POST` | `/create` | `{pickupLoc, dropoffLoc, distanceKm, durationMin, fare}` | `{rideId, status}` | ✅ Working |
| `GET` | `/` | - | `[{ride1}, {ride2}, ...]` | ✅ Working |
| `GET` | `/:id` | - | `{ride details}` | ✅ Working |
| `PUT` | `/:id/accept` | `{driverId}` | `{updated ride}` | 🚧 Partial |
| `PUT` | `/:id/complete` | - | `{updated ride}` | 🚧 Partial |
| `PUT` | `/:id/cancel` | `{reason}` | `{cancelled ride}` | ⏳ Not started |
| `GET` | `/history/:userId` | - | `[{rides}]` | ✅ Working |

### Fare Routes (`/api/fare/*`)

| Method | Endpoint | Body | Response | Status |
|--------|----------|------|----------|--------|
| `POST` | `/calculate` | `{distanceKm, vehicleType, peakHours}` | `{fare, breakdown}` | ✅ Working |

**Notes:**
- ✅ = Fully implemented and tested
- 🚧 = Partially implemented, needs testing
- ⏳ = Not started or incomplete

---

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  name          String
  password      String?           // nullable for OAuth users
  googleId      String?  @unique  // Google OAuth ID
  avatar        String?           // Profile picture URL
  role          Role     @default(RIDER)  // RIDER | DRIVER | ADMIN
  phone         String?
  rating        Float    @default(5.0)
  
  ridesAsRider  Ride[]   @relation("RiderRides")
  ridesAsDriver Ride[]   @relation("DriverRides")
  
  createdAt     DateTime @default(now())
}
```

### Ride Model
```prisma
model Ride {
  id          String      @id @default(uuid())
  riderId     String
  driverId    String?
  status      RideStatus  @default(PENDING)
  pickupLoc   String      // "Lat,Lng" format
  dropoffLoc  String
  vehicleType String      @default("BoltSedan")
  fare        Float       @default(0.0)
  distanceKm  Float       // required - distance in kilometers
  durationMin Float       // required - duration in minutes
  
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  rider       User        @relation("RiderRides", fields: [riderId], references: [id])
  driver      User?       @relation("DriverRides", fields: [driverId], references: [id])
}
```

### Enums
```prisma
enum Role {
  RIDER    // Can book rides
  DRIVER   // Can accept rides
  ADMIN    // Full access (UI not implemented)
}

enum RideStatus {
  PENDING      // Just created, waiting for driver
  ACCEPTED     // Driver accepted
  ONGOING      // Ride in progress
  COMPLETED    // Destination reached
  CANCELLED    // Cancelled by rider/driver
}
```

---

## 🎨 Component Overview

### Key Frontend Components

#### Pages
| Component | Purpose | Status | Notes |
|-----------|---------|--------|-------|
| Landing.jsx | Public landing page with hero | ✅ Complete | - |
| Login.jsx | Email/password + OAuth login | ✅ Complete | Works with backend |
| SignUp.jsx | User registration form | ✅ Complete | Role selection included |
| MapDashboard.jsx | Rider main interface | 🚧 Partial | Map + widget, no live tracking |
| DriverDashboard.jsx | Driver interface | 🚧 In Progress | Shows rides, accept flow incomplete |
| History.jsx | Ride history view | 🚧 Partial | Lists rides, filtering TODO |
| Profile.jsx | User profile management | 🚧 Partial | Basic info edit, vehicle TODO |
| Setting.jsx | App settings | 🚧 Partial | Limited options |
| Payments.jsx | Payment management | ❌ Stub | Empty page |

#### Components
| Component | Purpose | Status |
|-----------|---------|--------|
| MapContainer.jsx | Google Maps with autocomplete | 🚧 Partial |
| RideBookingWidget.jsx | Booking form + fare display | 🚧 Partial |
| MapDirectionsRenderer.jsx | Route visualization | 🚧 Partial |
| NavBar.jsx | Top navigation | ✅ Complete |
| SideBar.jsx | Left sidebar menu | ✅ Complete |
| HeroSection.jsx | Landing hero section | ✅ Complete |
| Glassmorphism.jsx | Reusable glass card | ✅ Complete |
| Footer.jsx | Footer section | ✅ Complete |

### Key Backend Components

#### Controllers
| Controller | Methods | Status |
|-----------|---------|--------|
| authController.js | signup, login, getProfile, updateProfile | 🚧 Partial |
| rideController.js | createRide, acceptRide, completeRide | 🚧 Partial |
| fareController.js | calculateFare | ✅ Working |
| rideHistoryController.js | getRideHistory | ✅ Working |

#### Routes
| Route | Endpoints | Status |
|-------|-----------|--------|
| authRoute.js | POST /signup, /login, GET /profile | ✅ Implemented |
| rideRoute.js | POST /create, PUT /accept, GET /history | 🚧 Partial |
| fareRoute.js | POST /calculate | ✅ Implemented |

---

## 🔐 Authentication Flow

### Session-Based Authentication (Email/Password)

```
1. User submits email + password on /login
2. Backend validates credentials via authController
3. Password compared with bcrypt hash in database
4. If match: User session created with express-session
5. Session ID stored in browser cookie (httpOnly, Secure)
6. Subsequent requests validate session cookie
7. LayoutContext fetches /api/auth/profile to get user data
```

### OAuth 2.0 with Google

```
1. User clicks "Login with Google"
2. Frontend redirects to /api/auth/google
3. Passport.js initiates Google OAuth flow
4. User grants permissions on Google consent screen
5. Google redirects back to /api/auth/google/callback
6. Passport strategy receives OAuth tokens
7. User profile fetched from Google and matched/created in DB
8. Session established automatically
9. Redirected to /dashboard
```

---

## 🚧 Development Status

### Current Phase: **MVP - Core Features**

#### ✅ Completed
- [x] Basic project setup (Node + React + Vite)
- [x] Database schema design (User, Ride models)
- [x] Email/password authentication
- [x] Google OAuth 2.0 integration
- [x] User profile management
- [x] Ride creation (riders)
- [x] Ride history view
- [x] Fare calculation
- [x] UI pages and navigation
- [x] Google Maps integration
- [x] Basic styling with Tailwind CSS

#### 🚧 In Progress
- [ ] Real-time ride tracking (WebSocket infrastructure ready)
- [ ] Driver ride acceptance workflow
- [ ] Driver dashboard complete flow
- [ ] Complete error handling
- [ ] Form validation on backend
- [ ] API response standardization

#### ⏳ Not Started
- [ ] WebSocket integration for real-time updates
- [ ] Payment gateway (Stripe/Razorpay)
- [ ] Notifications (email, SMS, in-app)
- [ ] Advanced testing (unit, integration, E2E)
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Production deployment
- [ ] Admin dashboard
- [ ] Rate limiting & security hardening
- [ ] Logging & monitoring

---

## 🐛 Known Issues & TODOs

### Critical
- [ ] **WebSocket not connected** - Infrastructure in place, not wired to front/backend
- [ ] **Error handling incomplete** - Generic error responses, no validation middleware
- [ ] **No input validation** - Backend should validate all requests
- [ ] **Payment page is stub** - No actual payment implementation

### High Priority
- [ ] Driver acceptance flow needs real-time updates
- [ ] Ride status updates not real-time
- [ ] No notification system
- [ ] No driver location tracking
- [ ] Fare calculation needs refinement (surge pricing, vehicle type multipliers)

### Medium Priority
- [ ] API should return standardized response format
- [ ] Add comprehensive logging
- [ ] Add request/response interceptors
- [ ] Improve error messages
- [ ] Add loading states to all async operations

### Low Priority
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Optimize database queries
- [ ] Add database indexing for performance
- [ ] Dark mode support

---

## 🤝 Contributing

This is a learning project. Contributions, suggestions, and improvements are welcome!

### How to Contribute
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'Add: description'`
6. Push to your branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Code Standards
- Use ES6+ syntax
- Follow existing code structure
- Add comments for complex logic
- Keep functions focused and reusable
- Test changes before submitting

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 📚 Resources

### Learning Materials
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

### Tools Used
- [Vite](https://vitejs.dev/)
- [Neon Database](https://neon.tech/)
- [Google Maps API](https://developers.google.com/maps)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

---

## 🎯 Next Steps

1. **Implement WebSocket real-time tracking**
   - Connect WebSocket server on backend
   - Send driver location updates to riders
   - Update ride status in real-time

2. **Complete driver workflow**
   - Show pending rides in driver dashboard
   - Implement accept/reject ride logic
   - Show ride details and directions

3. **Add comprehensive error handling**
   - Validate all user inputs
   - Return standardized error responses
   - Add error boundaries on frontend

4. **Integrate payment system**
   - Replace Payments stub page
   - Integrate Stripe or Razorpay
   - Handle transaction records

5. **Add notification system**
   - Ride request notifications for drivers
   - Ride acceptance notifications for riders
   - Email or SMS confirmations

---

**Status:** 🚧 Under Active Development | Last Updated: July 2026

For questions, feedback, or suggestions, please open a GitHub Issue.

**Happy coding! 🚀**
