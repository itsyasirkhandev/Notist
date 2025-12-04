# Notist - Modern Productivity & Note-Taking App

**A beautiful, offline-first note-taking application built for the modern web. Capture ideas, organize thoughts, and get things done with a powerful rich-text editor and real-time sync.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge&logo=vercel)](https://notist-yk.vercel.app/) [![Demo Video](https://img.shields.io/badge/Demo%20Video-Watch%20Now-red?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/6JB2v4oabrk)

<p align="center">
  <img src="public/hero-preview.png" alt="Notist Dashboard 3D Preview" width="100%">
</p>

## 🎥 Demo Video

Watch how you can transform scattered thoughts into organized notes in just 2 minutes:

<p align="center">
  <a href="https://youtu.be/6JB2v4oabrk" target="_blank">
    <img src="https://img.youtube.com/vi/6JB2v4oabrk/maxresdefault.jpg" alt="Notist Demo Video Thumbnail" style="width: 100%; max-width: 800px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
  </a>
</p>

<p align="center">
  <a href="https://youtu.be/6JB2v4oabrk" target="_blank">
    <img src="https://img.shields.io/badge/Watch%20Demo-YouTube-red?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch Demo">
  </a>
</p>

## Table of Contents

- [🎥 Demo Video](#-demo-video)
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Connect with Me](#connect-with-me)

## About The Project

Notist is a next-generation note-taking platform designed for speed, aesthetics, and functionality. It leverages the latest web technologies like **Next.js 16** and **Tailwind CSS v4** to deliver a fluid, app-like experience. 

Whether you're drafting a blog post, managing tasks, or organizing research, Notist adapts to your workflow with features like **Slash Commands**, **Block-based Editing**, and **Offline Support**.

## Key Features

### 📝 Core Experience
- **Rich Text Editor**: Powered by TipTap, featuring headings, lists, quotes, code blocks, and more.
- **Slash Commands**: Type `/` to quickly insert elements like tables, task lists, and dividers.
- **Markdown Support**: Intuitive formatting shortcuts (`#` for headings, `*` for lists).
- **Table Management**: Advanced table controls with a floating bubble menu.

### 🚀 Productivity
- **Smart Search**: Instantly find notes with highlighted search terms in the preview.
- **Keyboard Shortcuts**: Navigate and edit faster with a comprehensive shortcuts system (`Cmd+K`, `Cmd+J`).
- **Quick Actions**: Pin, delete, or copy notes directly from the card view.
- **Auto-Save**: Never lose work; changes are saved automatically and synced in real-time.

### 🎨 Design & UX
- **Modern Dashboard**: A beautiful, responsive grid layout with glassmorphism effects.
- **Color-Coded Tags**: Organize notes with auto-colored tags for easy visual scanning.
- **Dark Mode**: Fully optimized dark theme for comfortable night-time writing.
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices.

### 🛡️ Tech & Security
- **Offline-First**: Built with PWA capabilities; access and edit notes without internet.
- **Real-Time Sync**: Data syncs instantly across all devices via Firebase Firestore.
- **Secure Auth**: Enterprise-grade authentication with Google and Email/Password support.

## Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next JS 16" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Firebase_11-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/TipTap-Editor-1a1a1a?style=for-the-badge&logo=tiptap&logoColor=white" alt="TipTap Editor" />
  <img src="https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn UI" />
</p>

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Editor**: [TipTap](https://tiptap.dev/) (Headless wrapper for ProseMirror)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Auth**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)

## Screenshots

### Dashboard Views
| Light Mode Dashboard | Dark Mode Dashboard |
| :---: | :---: |
| ![Light Dashboard](https://i.postimg.cc/KY2jFzrn/Notist-light-dashboard.png) | ![Dark Dashboard](https://i.postimg.cc/W4vzj368/notist-dark-dashboard.png) |

### Note Editor
![Note Editor - Rich Text Editing](https://i.postimg.cc/6QXqw3LC/note-creation-editing-light.png)

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/itsyasirkhandev/notist.git
    cd notist
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory with your Firebase credentials:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:9002` to view the app.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── auth/            # Login/Signup pages
│   ├── dashboard/       # Main dashboard
│   ├── notes/           # Note editor routes
│   └── page.tsx         # Landing page
├── components/
│   ├── landing/         # Landing page sections (Hero, Features, etc.)
│   ├── ui/              # Reusable shadcn/ui primitives
│   ├── NoteCard.tsx     # Dashboard note component
│   ├── RichTextEditor.tsx # TipTap editor implementation
│   └── ...
├── firebase/            # Firebase config & hooks
└── lib/                 # Utilities & types
```

## Connect with Me

- **Yasir Khan**
- **Portfolio**: [yasir.qzz.io](https://yasir.qzz.io)
- **GitHub**: [@itsyasirkhandev](https://github.com/itsyasirkhandev)
- **LinkedIn**: [Yasir Khan](https://linkedin.com/in/itsyasirkhandev)

---

**Star the repo if you like it! ⭐**
