# 🚀 EMS - Employee Management System (Frontend)

This project is a production-ready **Employee Management Web Application** designed for a technical interview assignment. It features a high-end SaaS aesthetic, full CRUD operations, and a mobile-first responsive architecture.

---

## 🏗️ Architectural Decisions & Trade-offs

### 1. Feature-Sliced Module Structure
The project follows a **Feature-based architecture** (`src/features/`) rather than a flat folder structure. Pages, components, hooks, and services are grouped by their domain (e.g., Auth, Employees).
- **Decision**: Ensures the codebase remains scalable and maintainable as new domains are added.
- **Trade-off**: Slightly more initial setup time for boilerplate, but prevents the "component soup" problem in larger projects.

### 2. Hybrid State Management (Zustand + TanStack Query)
I utilized **TanStack Query (React Query)** for server-state (data fetching, caching, synchronization) and **Zustand** for global UI state (authentication, shared UI toggles).
- **Decision**: TanStack Query handles the complex logic of caching and loading states automatically, while Zustand provides a minimalistic, low-boilerplate solution for client-side persistence.
- **Trade-off**: This approach moves away from Redux, which might have more ecosystem tools but introduces excessive boilerplate for this scale of application.

### 3. Performance & UX Optimizations
To ensure a "production-ready" feel, I implemented several UX-first features:
- **Optimistic UI & Shimmer Skeletons**: Custom skeleton loaders ensure the layout doesn't "jump" during data fetching.
- **Debounced Search**: Search queries are debounced (500ms) to reduce redundant API calls and improve performance.
- **Glassmorphism Mobile UI**: A custom-built mobile bottom navigation ensures a premium experience for handheld users, matching modern app standards.

---

## ✨ Key Features & Requirements Met

- [x] **Full CRUD Operations**: Create, Read, Update, and both Soft/Hard Delete.
- [x] **Advanced Search**: Case-insensitive, partial-match search by employee name with debouncing.
- [x] **Real-time Notifications**: Custom premium toast system for success/error feedback.
- [x] **Loading Indicators**: Shimmer-effect skeletons for profiles and data tables.
- [x] **Mobile Responsive**: Adaptive sidebar for desktop and persistent bottom-nav for mobile.
- [x] **Input Validation**: Schema-based validation using Zod and React Hook Form.

---

## 🛠️ Technical Stack (Modern MERN)

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Framework** | **React** | `v19.2.0` |
| **Build Tool** | **Vite** | `v7.3.1` |
| **State** | **Zustand** | `v5.0.11` |
| **Data Fetching** | **TanStack Query** | `v5.90.21` |
| **Data Table** | **TanStack Table** | `v8.21.3` |
| **Styling** | **Tailwind CSS** | `v4.1.18` |
| **Form** | **React Hook Form** | `v7.71.1` |
| **Validation** | **Zod** | `v3.24.1` |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# API Base URL (Backend Connection)
VITE_API_URL=http://your-backend-api.com/api

# Google OAuth Client ID (For Authentication)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
src/
├── api/            # Axios instance and interceptors
├── components/     # Universal UI components (Layout, Base UI)
├── features/       # Feature-driven modules
│   ├── auth/       # Login logic & Google OAuth
│   └── employees/  # CRUD pages, Hooks, and Tables
├── hooks/          # Shared utility hooks (useDebounce, etc.)
├── lib/            # Shared utilities and constants
└── store/          # Zustand global state (authStore)
```

---

## 🤝 Submission Checklist

- [x] Responsive & accessible UI.
- [x] Frontend validation with clear error responses.
- [x] Loading indicators & Toast notifications.
- [x] Detailed README with architectural overview.
