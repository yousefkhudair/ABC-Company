
# Airline Navigator Web Application

This is a full-stack web application built with React, TypeScript, Express, and Vite.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (v9 or later)

### LaunchDarkly Configuration

This project uses LaunchDarkly for feature flagging. To use it locally:

1. Create a LaunchDarkly account at [launchdarkly.com](https://launchdarkly.com)
2. Create a new project in LaunchDarkly dashboard
3. Create a feature flag named `showFlightStatus` (boolean type)
4. Obtain your Client-Side ID from your LaunchDarkly project settings
5. Create a `.env` file in the project root with:
   ```
   VITE_LAUNCHDARKLY_CLIENT_ID=your-client-side-id
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

This will start the server on [http://localhost:5000](http://localhost:5000).

## Project Structure

```
├── client/               # Frontend code
│   ├── public/           # Static assets
│   ├── src/              # React components and logic
│   └── index.html        # HTML entry point
├── server/               # Backend code
│   ├── index.ts          # Express server setup
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage logic
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Data schemas
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - TailwindCSS
  - Shadcn/UI Components
  - Vite
  - LaunchDarkly (Feature Flags)

- **Backend**:
  - Express.js
  - Node.js
  - TypeScript

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Run the production build
- `npm run check` - Run TypeScript type checking

## Additional Information

The server runs on port 5000 by default. Make sure this port is available when running the application locally.

## License

MIT
