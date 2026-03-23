# Algo Engine

Algo Engine is an interactive React application for learning algorithms through visual simulation, step-by-step execution, and explanation-first workflows.

The project supports category browsing, algorithm detail pages, custom user input, playback controls, and internal state panels (graphs, tables, and iteration traces).

## Highlights

- Category-based learning flow from home page to algorithm simulation
- Dedicated simulation engine for sorting, searching, graph, and dynamic-programming problems
- Step playback with previous, next, and auto-play controls
- Visual state views:
  - Numeric bar charts
  - Graph node/edge panels
  - DP/state tables
  - Token/chip views for text-like sequences
- Written explanation timeline for every simulation step

## Tech Stack

- React 19
- React Router DOM
- Framer Motion
- Vite
- ESLint

## Project Structure

Core application files:

- src/main.jsx: entry point
- src/App.jsx: router setup
- src/pages/Home.jsx: landing page
- src/pages/CategoryPage.jsx: per-category algorithm listing
- src/pages/AlgorithmSimulation.jsx: main simulation experience
- src/components/AlgoCard.jsx: category card component used on home page

Simulation and data layers:

- src/data/algorithms.js: home page category cards
- src/data/categoryAlgorithms.js: category to algorithm catalog mapping
- src/utils/algorithmSimulations.js: generic simulation engine and input specs
- src/utils/sortingSimulations.js: sorting-focused simulation utilities

Styling and docs:

- src/index.css: global site styles
- src/styles/sorting.css: category/simulation styles
- docs/simulation-inputs.md: algorithm input formats and test cases

## Routing

The app uses dynamic routes:

- /: home page
- /:categoryId: category algorithm listing
- /:categoryId/:algorithmId: algorithm simulation page

Examples:

- /sorting
- /sorting/bubble
- /graphs/topological
- /dp/knapsack

## Supported Categories

- Sorting and Searching
- Graph Algorithms
- Dynamic Programming
- Greedy Algorithms
- Tree Algorithms
- Pathfinding Algorithms
- String Algorithms
- Backtracking Algorithms

## Simulation Input Modes

The simulator selects input UI and validation rules by algorithm type:

- numeric list mode
- numeric search mode (list + target)
- graph mode (node count, edges, optional start/target)
- knapsack mode (weights, values, capacity)
- lcs mode (two strings)
- generic value-list mode

For exact test cases and examples, see docs/simulation-inputs.md.

## Local Development

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

- npm run dev: start Vite dev server
- npm run build: create production build
- npm run preview: serve build output locally
- npm run lint: run ESLint checks

## Deployment (Vercel)

This repository includes vercel.json with an SPA rewrite to index.html for all paths.

Why this matters:

- React Router uses browser history routes
- Direct navigation to deep links must resolve to the frontend entry HTML
- Without rewrite support, routes like /graphs/dfs can return 404 in production

## Accessibility and UX Notes

- Keyboard-friendly interactions on clickable cards
- High-contrast simulation panels for readability
- Step explanations to support conceptual understanding beyond animation

## Extending the Project

Common next enhancements:

- Add mathematically strict simulators for remaining placeholder algorithms
- Add per-step pseudocode highlighting
- Add export/share of input presets
- Add automated tests for simulation engines and route-level smoke tests

## Contributing

1. Create a feature branch
2. Keep changes scoped and documented
3. Run lint before opening a PR
4. Update docs/simulation-inputs.md when input rules change

## License

No license file is currently included. Add one if you plan to distribute publicly.
