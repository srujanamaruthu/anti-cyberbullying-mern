# Anti-Cyberbullying Student Network (MERN Stack)

The **Anti-Cyberbullying Student Network** is a secure, privacy-focused full-stack web application designed for students to report incidents of cyberbullying anonymously or publicly, track logged cases, and access support hotlines. 

This platform aims to lower the barrier for victims and witnesses of online harassment by offering robust anonymity toggles, JWT-secured accounts, and an immersive, responsive dark-themed user interface.

---

## 🌟 Key Features

- **Robust User Authentication**: Secured with JSON Web Tokens (JWT) and `bcryptjs` password hashing.
- **Confidentiality / Anonymous Reporting**: Toggle identity masking dynamically per report.
- **Incident Custom Categories**: Tag cases under categories like Harassment, Cyberstalking, Outing, Impersonation, Trolling, etc.
- **Search & Manage Feed**: Live search filtering on user dashboard and report history with full CRUD ownership enforcement.
- **Responsive Dark Theme UI**: Premium look with blue-purple gradients, glassmorphism layout, and custom fonts.
- **Dynamic Stats Board**: Real-time calculation of anonymous vs. public report metrics on user dashboards.
- **On-Campus Emergency Hotline Info**: Direct link to counselling centers, cyber cells, and support channels.

---

## 🛠️ Technology Stack

### Frontend
- **React.js** (Vite Scaffolded Single Page App)
- **React Router DOM** (Client-side protected route management)
- **Axios** (With interceptors to automate header injection)
- **Vanilla CSS Variables** (Smooth gradients, responsive flex/grids, glass card panels)

### Backend
- **Node.js** & **Express.js** (REST API)
- **MongoDB Atlas** & **Mongoose** (Data schemas and relationship mapping)
- **JWT** (`jsonwebtoken` for authorization middleware)
- **Bcryptjs** (Password hashing hooks)

---

## 📁 Directory Structure

```
anti-cyberbullying-mern/
├── backend/
│   ├── config/
│   │   └── db.js                # Mongoose Connection setup
│   ├── controllers/
│   │   ├── authController.js    # Register and Login logic
│   │   └── reportController.js  # Submit, read, and delete reports
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT authorization route protection
│   ├── models/
│   │   ├── User.js              # User schema with pre-save hashing
│   │   └── Report.js            # Report schema (linked to User)
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoint routers
│   │   └── reportRoutes.js      # Incident CRUD routers
│   ├── .env                     # Local environment settings (Ignored by Git)
│   ├── server.js                # Express Server startup entry
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable Navbar, Alert, Spinner, ProtectedRoute
│   │   ├── context/             # AuthContext (global state provider)
│   │   ├── pages/               # Home, Login, Register, Dashboard, Report, MyReports
│   │   ├── services/            # Axios API config with header interceptor
│   │   ├── App.jsx              # App layout and route configurations
│   │   ├── index.css            # Master stylesheet (dark theme & responsive typography)
│   │   └── main.jsx             # React DOM bundle mounter
│   ├── index.html               # Main template, loaded with Google font 'Outfit'
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm or yarn
- MongoDB (Local installation or MongoDB Atlas online cluster account)

---

### Step 1: Clone and Set Up Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and fill in your credentials:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/anti-cyberbullying?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_signature_key
   ```
   *Note: If testing locally without Atlas, you can use `mongodb://127.0.0.1:27017/anti-cyberbullying`.*

4. Install server dependencies:
   ```bash
   npm install
   ```

5. Launch the backend server in development mode (with hot-reload):
   ```bash
   npm run dev
   ```
   The backend should start on `http://localhost:5000`.

---

### Step 2: Set Up Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install client dependencies:
   ```bash
   npm install
   ```

3. Launch the Vite dev server:
   ```bash
   npm run dev
   ```
   The application should open at `http://localhost:5173`.

---

## 🔒 API Endpoints Reference

### Authentication (Public)
| Method | Endpoint | Description | Body Payload |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Registers a new student and returns JWT token | `{ name, email, password }` |
| **POST** | `/api/auth/login` | Authenticates student and returns JWT token | `{ email, password }` |

### Incident Reports (Protected - Requires JWT Bearer Header)
| Method | Endpoint | Description | Body Payload / Query |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/reports` | Submit a new incident report | `{ title, type, description, anonymous }` |
| **GET** | `/api/reports` | Retrieve all reports (handles privacy masking) | *None* |
| **GET** | `/api/reports?my=true` | Retrieve reports belonging only to the user | *Query parameter: my=true* |
| **GET** | `/api/reports/:id` | Fetch details of a single report | *ID as URL parameter* |
| **DELETE**| `/api/reports/:id` | Delete a report (restricted to report creator) | *ID as URL parameter* |

---

## 🛡️ Identity Masking Mechanism
For any report submitted with `anonymous: true`, the API performs a security filter. When reports are fetched:
1. If the requesting user **is** the owner of the report, they see their name flagged as owner.
2. If the requesting user **is not** the owner, the username is masked to **"Anonymous Student"** on the backend before the response is dispatched. This ensures student identifiers are never leaked to client search feeds.
