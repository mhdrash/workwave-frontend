# WorkWave - Recruitment Platform (Frontend)

**WorkWave Frontend** is a modern React-based web application designed to power a seamless recruitment experience. It serves as the visual interface connecting employers managing job listings and job seekers exploring their next career opportunity.

---

## 🚀 Project Overview

The WorkWave frontend delivers a fast, responsive, and intuitive user experience, built with a focus on performance, clean UI, and smooth integration with the backend API.

### Core Functionalities:
* **For Employers:** A dedicated dashboard to post job vacancies, manage listings, and review applicant profiles.
* **For Job Seekers:** Advanced filtering and search capabilities to discover the most relevant career opportunities.
* **Security & Auth:** Integration with **JWT (JSON Web Tokens)** for secure login, registration, and role-based route protection.
* **Tech Stack:** Built using **React.js**, **Vite**, **Tailwind CSS**, and **Axios**.

---

## 🛠 Getting Started (Setup & Installation)

Follow these steps to set up the frontend environment on your local machine:

### 1. Create project folder
Create a folder for your project and navigate into it:
```bash
mkdir workwave-frontend
cd workwave-frontend
```

### 2. Clone the repository
Clone the project and install dependencies:
```bash
git clone https://github.com/your-username/workwave-frontend.git .
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=WorkWave
```

### 4. Run the development server
```bash
npm run dev
```
The app will be running at `http://localhost:5173`

---

## 🔐 Authentication

The frontend communicates with the backend using JWT tokens:
* Tokens are stored in `localStorage` after a successful login.
* Axios interceptors automatically attach the token to every outgoing request.
* Protected routes redirect unauthenticated users to the login page.
* Role-based rendering controls what employers vs. job seekers can see.

---

## 📁 Project Structure

workwave-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images & icons
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route-level pages
│   ├── context/         # Auth & global state (Context API)
│   ├── hooks/           # Custom React hooks
│   ├── services/        # Axios API call functions
│   ├── routes/          # Protected & public route wrappers
│   ├── App.jsx
│   └── main.jsx
├── .env
├── vite.config.js
└── package.json

---

## 📦 Key Dependencies

```bash
npm install axios react-router-dom react-hook-form zustand @tanstack/react-query
```

| Package | Purpose |
|---|---|
| `react-router-dom` | Client-side routing & protected routes |
| `axios` | HTTP requests to the backend API |
| `react-hook-form` | Form handling and validation |
| `zustand` | Lightweight global state management |
| `@tanstack/react-query` | Server state, caching & data fetching |

---

## 🔗 Connecting to the Backend

Make sure the **WorkWave Backend API** is running before starting the frontend. The base URL is set via the `.env` file:

VITE_BACKEND_URL="http://localhost:3000/api"

All API calls are centralized in `src/services/` using a configured Axios instance with interceptors for authentication headers and error handling.

---

## 🚀 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy on **Vercel**, **Netlify**, or any static hosting provider.