# Dual Mode Portfolio

A dual-mode personal portfolio built with React, Vite, and Tailwind CSS.

This project presents the same profile through two different experiences:

- Casual Mode: a clean, scroll-based portfolio with animated sections for skills, experience, education, and projects.
- Programmer Mode: an interactive developer-themed interface with a file explorer, code-style content view, and terminal-like command system.

## Live Experience

- Home route lets visitors choose their preferred view.
- Casual route focuses on readability and professional presentation.
- Dev route emphasizes interactivity, command input, and VS Code-inspired UI details.

## Key Features

- Two distinct portfolio journeys from a single app.
- Lazy-loaded pages for faster initial load.
- Animated transitions powered by Framer Motion.
- Responsive design for desktop and mobile.
- Interactive terminal commands in Programmer Mode.
- Clickable links and email copy interactions in code-like panels.
- Resume and social profile integration.

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Icons
- ESLint

## Project Structure

- src/components/Home.jsx: landing page and mode selection.
- src/pages/Casual.jsx: standard portfolio experience.
- src/pages/Dev.jsx: terminal-style interactive portfolio.
- src/App.jsx: lightweight route selection.
- src/main.jsx: app entry point.

## Routes

- /: mode selection page.
- /casual: casual portfolio view.
- /dev: programmer portfolio view.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Scripts

- npm run dev: run Vite development server.
- npm run build: create production build.
- npm run preview: preview production build locally.
- npm run lint: run ESLint.

## Deployment

The project includes a Vercel SPA rewrite configuration in vercel.json so direct navigation to /casual and /dev works correctly in production.

## Contact

- GitHub: https://github.com/Drona-Srivastava
- LinkedIn: https://www.linkedin.com/in/drona-srivastava-141a4a288/
- Email: srivastavadrona@gmail.com
