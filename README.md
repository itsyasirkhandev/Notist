# Notist - Your Personal Task Manager

**Live URL:** [https://notesbyyasir.netlify.app/](https://notesbyyasir.netlify.app/)

Notist is a modern, intuitive, and feature-rich to-do list and note-taking application designed to help you stay organized and boost your productivity. Built with a powerful tech stack, it offers a seamless and responsive user experience.

## Core Features

- **Task & Note Management:** Easily create, edit, and delete notes and tasks.
- **Rich Text Editing:** A full-featured WYSIWYG editor allows you to format your notes with headings, bold, italics, lists, and more.
- **Task Status:** Mark tasks as complete or active to keep track of your progress.
- **Tagging & Filtering:** Organize your notes with custom tags and quickly filter them by tag, status, or search term.
- **Drag and Drop:** Intuitively reorder your notes with a smooth drag-and-drop interface.
- **Secure Authentication:** Sign in securely with your Google account, powered by Firebase Authentication.
- **Real-time Data Sync:** Your notes are saved and synced in real-time across all your devices using Firestore.
- **Theming:** Switch between a light and dark mode to suit your preference.
- **Responsive Design:** A mobile-first design ensures a great experience on any device, from desktops to smartphones.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore & Authentication)
- **State Management:** React Hooks & Context API
- **Deployment:** [Netlify](https://www.netlify.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/notist.git
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
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    ```
5.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Author

- **Yasir Khan** - [Portfolio](https://yasir.qzz.io)

---

This project was bootstrapped with Firebase Studio.
