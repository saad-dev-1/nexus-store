# NEXUS

A dark-themed e-commerce storefront built with React and Tailwind CSS. Full cart, user authentication, order placement, and Cash on Delivery support — connected to a Laravel backend API.

**Live Demo:** https://nexus-store-mu.vercel.app

**Backend API:** https://github.com/saad-dev-1/nexus-backend

---

## Why I Built This

Got tired of building todo apps. Wanted something with real complexity — cart state, form validation, checkout flow, and API integration. E-commerce has all of it.

Also, I'm from Pakistan, where most small stores take orders on WhatsApp. So I built a proper storefront with real order placement — the kind of store a small business actually needs.

---

## Features

### Shopping Experience

- Product browsing with category filters and sorting
- Live search with debounced API queries
- Product detail page with image gallery
- Multiple product images with hover effect on cards
- Responsive grid layout that works on mobile, tablet, and desktop

### Cart & Checkout

- Persistent cart with localStorage (guest users)
- Synced cart for logged-in users (via backend API)
- Quantity updates and item removal
- Coupon validation with live discount calculation
- Multi-step checkout with address management
- Cash on Delivery and online payment options
- Order placement with success/failure handling

### User Account

- Register and login with token-based authentication
- Profile management (name, phone, password)
- Multiple shipping addresses
- Order history with detailed view
- Invoice PDF download
- Wishlist

### Experience

- Dark theme with Geist font (Vercel's typeface)
- Smooth animations with Framer Motion
- Toast-style notifications
- Fully responsive (mobile-first)

---

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v3
- **Routing:** React Router v7
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **State Management:** Context API + localStorage
- **Font:** Geist (self-hosted)
- **Deployment:** Vercel

---

## Requirements

Before you begin, make sure you have:

- Node.js 18 or higher
- npm or yarn
- A code editor (VS Code recommended)
- Git

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/saad-dev-1/nexus-store.git
cd nexus-store
