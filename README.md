# Notist - Your Personal Note-Taking App

**A modern, intuitive, and feature-rich note-taking application designed to help you stay organized and capture your thoughts.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge)](https://notesbyyasir.netlify.app/)

<p align="center">
  <img src="https://i.postimg.cc/W16R73gK/main-dashboard-page.png" alt="Notist Dashboard" width="100%">
</p>

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Connect with Me](#connect-with-me)

## About The Project

Notist is a powerful and seamless note-taking app built with a modern tech stack. It provides a fluid user experience with real-time data synchronization, secure authentication, and a rich text editor. Whether you're managing daily thoughts or organizing complex projects, Notist is designed to help you capture your ideas and stay productive.

## Key Features

- **Note Management**: Easily create, edit, and delete your notes.
- **Rich Text Editing**: A full-featured WYSIWYG editor allows you to format your notes with headings, bold, italics, lists, and more.
- **Tagging & Filtering**: Organize your notes with custom tags and quickly filter them by tag or search term.
- **Drag and Drop**: Intuitively reorder your notes with a smooth drag-and-drop interface.
- **Secure Authentication**: Sign in securely with your Google account or by Email/Password, powered by Firebase Authentication.
- **Real-time Data Sync**: Your notes are saved and synced in real-time across all your devices using Firestore.
- **Theming**: Switch between a light and dark mode to suit your preference.
- **Responsive Design**: A mobile-first design ensures a great experience on any device, from desktops to smartphones.

## Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next JS 15" />
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/TipTap-1a1a1a?style=for-the-badge&logo=tiptap&logoColor=white" alt="TipTap Editor" />
</p>

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Rich Text Editor**: [TipTap](https://tiptap.dev/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore & Authentication)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) (Google AI)

## Screenshots

| Main Dashboard Page | Notes Creation Page | Authentication Page |
| :---: | :---: | :---: |
| <img src="https://i.postimg.cc/W16R73gK/main-dashboard-page.png" alt="Main Dashboard" width="100%"> | <img src="https://i.postimg.cc/WpBbWdqV/notes-creation-interface.png" alt="Notes Creation" width="100%"> | <img src="https://i.postimg.cc/WzgjL7q1/auth-page.png" alt="Auth Page" width="100%"> |

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/itsyasirkhandev/notist.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd notist
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Firebase project credentials:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```
5.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 9002) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |


## Connect with Me

- **Yasir Khan** 
- **Portfolio**: [yasir.qzz.io](https://yasir.qzz.io)
- **GitHub**: [@itsyasirkhandev](https://github.com/itsyasirkhandev)
- **Facebook**: [Yasir Khan](https://web.facebook.com/profile.php?id=61580301107047)

---

This project was bootstrapped with Firebase Studio.