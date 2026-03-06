# dinner-selector-app

Family Dinner Spinner - Let the wheel decide where you eat!

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── context/       # Context providers for state management
├── services/      # API and utility services
├── types/         # Type definitions (if using TypeScript comments)
├── App.js         # Main app component
├── index.js       # React entry point
└── index.css      # Global styles (Tailwind)
```

## Features (MVP)

- Restaurant discovery based on user location
- Filterable wheel UI with restaurants
- Spin animation and random selection
- Restaurant details view
- Favorites and no-go preferences
- Spin history

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (irreversible)

## Tech Stack

- React 18
- Tailwind CSS
- Create React App
- Plain JavaScript (no TypeScript)

## API

Currently using mock data. Will integrate with a real restaurant API in future versions.

## License

MIT
