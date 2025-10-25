# Blueprint: Notist - A Note-Taking App

This document outlines the core features, design principles, and technical specifications for Notist, a modern note-taking application.

## 1. Core Features

### Implemented Features
- **User Authentication**: Secure user sign-up and login functionality.
- **Note Creation**: Users can create new rich-text notes with a title and content.
- **Note Editing**: Existing notes can be modified.
- **Note Deletion**: Users can delete their notes.
- **Rich-Text Formatting**: Basic formatting options such as bold, italics, lists, and headings are available.

### Planned Enhancements
- **Note Organization**:
    - **Drag and Drop**: Enable users to reorder notes using drag-and-drop.
    - **Pinning/Favorites**: Allow users to pin important notes to the top of the list.

## 2. Technical & Design Pillars

- **Accessibility**: Ensure the app is fully accessible, meeting WCAG 2.1 AA standards. This includes full keyboard navigation, accessible forms, descriptive images (alt attributes), and ARIA roles.
- **SEO Optimization**: Optimize the application for search engines with semantic HTML, structured data, a clean URL structure (`/notes/your-note-title`), and unique metadata for each page.
- **User-Centric Design**: Prioritize a clean, intuitive, and seamless user experience.
- **High Performance**: Ensure fast load times and smooth, responsive interactions.

## 3. Implementation Checklist

- **Keyboard Navigation**: All interactive elements must be fully operable via the Tab key.
- **Accessible Forms**: Every form input must have a correctly associated `<label>`.
- **Semantic SEO**: Use a clean URL structure and semantic HTML tags (`<h1>`, `<article>`, etc.).
- **Metadata**: Each note page should have a unique, descriptive `<title>` and `<meta name="description">` derived from the note's content.
