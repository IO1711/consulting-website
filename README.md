# 🌐 Consulting Service Website

A modern **consulting service website** built with **React + Vite**, focused on performance, clean architecture, and access-controlled user experiences.  
The application supports **role-based and subscription-based access**, global state management with **Zustand**, animated UI interactions, and scalable routing.

## 🧠 Tech Stack
- ⚛️ React + Vite
- 🟨 JavaScript (ES6+)
- 🧭 React Router
- 🐻 Zustand (global state management)
- 🎬 UI Animations
- 🔐 JWT-based authentication

## ✨ Features
- 🔐 JWT authentication with global state sharing
- 🐻 Zustand store for JWT token and API base URL
- 🧭 Dynamic and nested routing with React Router
- 🎭 Role-based access control (e.g. admin / user)
- 💳 Subscription-based access to protected pages
- 🎬 Animated UI transitions and interactions
- 🧩 Modular, scalable component architecture
- ⚡ Fast development and optimized builds with Vite

## 📁 Project Structure
public/
src/
├── adminTools/     # Admin-only tools and pages
├── assets/         # Static assets
├── auth/           # Authentication logic
├── components/     # Reusable UI components
├── router/         # Route definitions & guards
├── stores/         # Zustand global stores
├── utility/        # Helpers and utilities
├── App.css
├── App.jsx
├── AppLayout.jsx
├── index.css
├── main.jsx
├── useFetch.js
.gitignore
README.md
eslint.config.js
index.html
package.json
package-lock.json
vite.config.js

## 🧭 Routing & Access Control
- Routes are managed with **React Router**
- Protected routes enforce:
  - Authentication
  - User role permissions
  - Active subscription status
- Layout-based routing via `AppLayout`

## 🐻 State Management
- **Zustand** is used for lightweight global state
- Stores shared data such as:
  - JWT authentication token
  - API base URL
  - User role and subscription status

## 🎬 Animations
- Animations enhance user experience and page transitions
- Used for navigation, page entry, and UI feedback
- Keeps interactions smooth and modern

## 🚀 Getting Started
Install dependencies and start the development server:

npm install  
npm run dev

## 📌 Project Purpose
This project demonstrates a **real-world consulting platform frontend**, combining authentication, authorization, subscriptions, global state management, animations, and scalable routing patterns.

## 👨‍💻 Author
**Bilolbek Rayimov**  
Full-Stack Developer — React • JavaScript • Zustand • JWT
