# NEXUS

A dark-themed e-commerce store built with React and Tailwind. Full cart, WhatsApp checkout, and Cash on Delivery support.

**Live Demo:** https://nexus-store-mu.vercel.app

## Why I Built This

Got tired of building todo apps. Wanted something with real complexity — cart state, form validation, checkout flow. E-commerce has all of it.

Also, I'm from Pakistan, where most small stores take orders on WhatsApp. So I built the checkout around that instead of a fake credit card form.

## Features

- Cart with localStorage — survives page refresh
- WhatsApp checkout with auto-formatted order details
- Form validation with real rules (no numbers in names, proper phone format)
- Product search with live filtering
- Category filters and sorting
- Image gallery with thumbnails
- Fully responsive

## Tech Stack

- React 19 + Vite
- Tailwind CSS v3
- React Router v7
- Framer Motion
- Context API + localStorage
- Vercel

## Run Locally

```bash
git clone https://github.com/saad-dev-1/nexus-store.git
cd nexus-store
npm install
npm run dev

Project Notes
Products are in src/data/products.js

Store info (WhatsApp number, messages) is in src/data/siteConfig.js

Frontend only — no backend, orders go via WhatsApp

Dark theme design tokens are in tailwind.config.js

Contact
Email: sa1717595@gmail.com

GitHub: @saad-dev-1
