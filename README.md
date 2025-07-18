# Daily Gigs

**Live Site:** [https://daily-gigs.web.app/](https://daily-gigs.web.app/)

**Admin Login:**
- **Email:** cloudmining5023@gmail.com
- **Password:** Ahmed@1234

---

## Overview

**Daily Gigs** is a full-stack micro-task job platform built to connect workers with buyers for small online tasks. It enables users to earn by completing jobs, and buyers to manage task-based workflows efficiently. Designed with responsiveness, authentication, and scalability in mind, the platform streamlines task posting, submission, and withdrawal processes in real-time.

---

## Key Features

- Role-based dashboard with separate views for **Workers**, **Buyers**, and **Admins**
- **Secure Google Authentication** with intelligent user detection (new vs returning)
- **Task Lifecycle**: Post, Submit, Review, Approve/Reject with real-time updates
- **Notification System**: Floating pop-up notifications + optional email alerts
- **Withdrawal Management**: Coin-based system with withdrawal approvals by admin
- **Admin Panel**: Manage users, tasks, withdrawals, and global stats
- **Top Workers**: Dynamic section showing highest-earning users
- **Framer Motion Animations** for interactive and smooth UI transitions
- **Responsive Design** optimized for mobile, tablet, and desktop
- Real-time **Data Visualization** via charts (Recharts) for user insights

---

## Tech Stack

**Frontend:**
- React.js, Tailwind CSS, DaisyUI
- TanStack Query (for data fetching and caching)
- Firebase (Authentication, Hosting)
- Framer Motion (for animations)

**Backend:**
- Node.js, Express.js
- MongoDB Atlas (with native driver)
- Firebase Admin SDK (for secure auth handling)
- Resend (for transactional email notifications)

---

## Folder Structure Highlights

- `/dashboard/`: Role-based views and protected routes
- `/components/`: Reusable UI elements
- `/pages/`: Public pages including login, register, home, etc.
- `/hooks/`: Custom hooks for auth, API, role handling
- `/api/`: Modular backend APIs for submissions, withdrawals, users, tasks

---

## Getting Started (For Developers)

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/daily-gigs.git
