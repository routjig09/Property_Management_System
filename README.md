# PropSync Frontend

> **Find your place. Manage your property.**

PropSync is a modern, production-grade Property Management & Real Estate Marketplace web application built with React 19, TypeScript, Vite, Tailwind CSS v4, Zustand, React Router v7, and TanStack Query.

---

## 🌟 Key Features

### 🏡 Public Marketplace
- **Hero & Search System**: Hierarchical dependent location search (**State → City → Area**) with BHK, property type, and budget filters.
- **Property Listing & Filtering**: Filter sidebar with price ranges, BHK, purpose (Buy/Rent), property types (Apartments, Villas, Office, Plot, Commercial), sorting options, and pagination.
- **Property Details**: High-resolution gallery with thumbnail strip & fullscreen viewer, key specs overview, amenity icons, building/tower/unit details, location details, and direct contact options.
- **Inquiry System**: Modal form with validation (Zod + React Hook Form), contact preference selection (Call/WhatsApp/Email), and success messaging.
- **Favorites Management**: Instant favorite toggle with animated heart buttons and authentication prompts for guests.

### 👤 Customer Portal
- **Dashboard**: Personal summary showing saved properties, active inquiries, saved searches, and tailored property recommendations.
- **Favorites & Inquiries**: Dedicated views for managing saved listings and tracking inquiry statuses (**New**, **Contacted**, **In Progress**, **Resolved**, **Closed**).
- **Property Requirements**: Submit detailed property preferences for personalized matching.
- **Profile & Settings**: Profile updates and notification/privacy settings.

### 🛡️ Admin Portal
- **Dashboard**: Real-time analytics, property view bar charts, type distribution pie charts, activity logs, and key business metrics.
- **Property Management**: Table view of all listings with quick actions (View, Edit, Delete with modal confirmation) + **9-step multi-stage property creation wizard**.
- **User Management**: Filterable user table, role badges (**ADMIN** / **CUSTOMER**), and detailed user profile audit views.
- **Inquiry & Audit Logs**: Inquiry response panel and system-wide activity timeline.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript + Vite |
| **Styling** | Tailwind CSS v4 + Custom PropSync Design Tokens (`index.css`) |
| **Routing** | React Router v7 (Lazy loading, protected routes, role guards) |
| **State Management** | Zustand (`authStore`, `favoriteStore`, `uiStore`) |
| **Data Fetching** | TanStack React Query v5 |
| **Form Handling & Validation** | React Hook Form + Zod |
| **Icons & Charts** | Lucide React + Recharts |
| **HTTP & Mock API** | Axios + Dual-mode service layer (`VITE_USE_MOCK_API`) |

---

## 🎨 Design System

PropSync features a curated design language inspired by luxury architectural aesthetics:

- **Deep Navy** (`#1B2A4A` / `#0E1726`): Sophistication & structure
- **Warm Gold** (`#C9A96E` / `#B39257`): Elegance & accents
- **Ivory & Beige** (`#FDFBF7` / `#F7F4EE`): Soft background warmth
- **Typography**: Playfair Display (Headings) + Inter (Body)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env`:
   ```env
   VITE_USE_MOCK_API=true
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@propsync.com` | `admin123` |
| **Customer** | `customer@propsync.com` | `password123` |

---

## 📁 Directory Structure

```text
src/
├── components/
│   ├── admin/           # Stats, tables, timelines
│   ├── common/          # Logo, empty/error/loading states, toast container, modals
│   ├── customer/        # Customer-specific components
│   ├── layout/          # PublicHeader, PublicFooter
│   ├── property/        # PropertyCard, PropertyGrid, PropertyFilter, Gallery, etc.
│   └── ui/              # Button, Input, Select, Badge, Card, Modal, Drawer, Table, Tabs, etc.
├── constants/           # Navigation, Amenities, SortOptions, PropertyTypes
├── hooks/               # useProperties, useAuth, useFavorites, useMediaQuery, useToast, etc.
├── layouts/             # PublicLayout, CustomerLayout, AdminLayout
├── mock/                # Mock data (properties, locations, users, inquiries, activities)
├── pages/
│   ├── admin/           # Dashboard, Properties, Add Property, Property Detail, Users, etc.
│   ├── auth/            # Login, Register, Forgot Password
│   ├── customer/        # Dashboard, Favorites, Inquiries, Requirements, Profile, Settings
│   └── public/          # Home, Properties, Details, About, Contact
├── routes/              # AppRoutes, ProtectedRoute, RoleRoute
├── schemas/             # Zod validation schemas
├── services/            # Dual-mode API services (Auth, Property, Inquiry, Customer, Admin)
├── store/               # Zustand stores (Auth, Favorite, UI)
├── types/               # TypeScript interfaces
└── utils/               # Formatting & Tailwind cn helper
```
