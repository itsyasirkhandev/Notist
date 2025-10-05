# Notist - Your Personal Task Manager

**A modern, intuitive, and feature-rich to-do list and note-taking application designed to help you stay organized and boost your productivity.**

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

Notist is a powerful and seamless to-do list and note-taking app built with a modern tech stack. It provides a fluid user experience with real-time data synchronization, secure authentication, and a rich text editor. Whether you're managing daily tasks or organizing complex projects, Notist is designed to help you capture your thoughts and stay productive.

## Key Features

- **Task & Note Management**: Easily create, edit, and delete notes and tasks.
- **Rich Text Editing**: A full-featured WYSIWYG editor allows you to format your notes with headings, bold, italics, lists, and more.
- **Task Status**: Mark tasks as complete or active to keep track of your progress.
- **Tagging & Filtering**: Organize your notes with custom tags and quickly filter them by tag, status, or search term.
- **Drag and Drop**: Intuitively reorder your notes with a smooth drag-and-drop interface.
- **Secure Authentication**: Sign in securely with your Google account or by Email/Password, powered by Firebase Authentication.
- **Real-time Data Sync**: Your notes are saved and synced in real-time across all your devices using Firestore.
- **Theming**: Switch between a light and dark mode to suit your preference.
- **Responsive Design**: A mobile-first design ensures a great experience on any device, from desktops to smartphones.

## Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next JS" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://imgshields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" />
</p>

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore & Authentication)
- **Deployment**: [Netlify](https://www.netlify.com/)

## Screenshots

| Main Dashboard Page | Notes Creation Page | Authentication Page |
| :---: | :---: | :---: |
| <img src="https://i.postimg.cc/W16R73gK/main-dashboard-page.png" alt="Main Dashboard" width="100%"> | <img src="https://i.postimg.cc/WpBbWdqV/notes-creation-interface.png" alt="Notes Creation" width="100%"> | <img src="https://i.postimg.cc/WzgjL7q1/auth-page.png" alt="Auth Page" width="100%"> |

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

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
    Create a `.env.local` file in the root of your project and add your Firebase project credentials:
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
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Connect with Me

- **Yasir Khan** 
- **Portfolio**: [yasir.qzz.io](https://yasir.qzz.io)
- **GitHub**: [@itsyasirkhandev](https://github.com/itsyasirkhandev)
- **Facebook**: [Yasir Khan](https://web.facebook.com/profile.php?id=61580301107047)

---

This project was bootstrapped with Firebase Studio.