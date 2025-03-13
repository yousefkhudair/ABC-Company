
# Airline Navigator Web Application

This is a full-stack web application built with React, TypeScript, Express, and Vite.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Available Scripts](#available-scripts)
- [Additional Information](#additional-information)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (v9 or later)

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

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

## Configuration

### LaunchDarkly Setup (Required)

This project uses LaunchDarkly for feature flagging. To set it up:

1. Create a LaunchDarkly account at [launchdarkly.com](https://launchdarkly.com)
2. Create a new project in LaunchDarkly dashboard
3. Create the following feature flags:
   - `showFlightStatus` (boolean type)
   - `showDealsButton` (boolean type)
   - `displayDestinations` (boolean type)
4. Obtain your Client-Side ID from your LaunchDarkly project settings
5. Open the `.env` file and replace the placeholder with your actual LaunchDarkly Client-Side ID:
   ```
   VITE_LAUNCHDARKLY_CLIENT_ID=your-client-side-id
   ```

This application uses `dotenv` to reliably load environment variables in both development and production environments. The server-side code will automatically load variables from your `.env` file.

### User Context and Targeting

The application includes user context for targeting with the following attributes:
- User types:
  - Internal users (key: 'internal-user')
  - Anonymous users (key: 'anonymous-user')
- Custom attributes:
  - `isPremium`: Boolean attribute for premium user status

The header includes toggles to switch between user types and premium status, which automatically updates the LaunchDarkly context for targeting rules.

**Important for Local Development:**
- The LaunchDarkly integration is REQUIRED for this application to function properly
- The application will not show the Flight Status tab without a working LaunchDarkly connection
- Ensure your `.env` file contains a valid LaunchDarkly Client-Side ID before starting the application
- If you see errors about "LaunchDarkly client ID not found" in your console, check that your `.env` file is set up correctly
- Feature flags will only work if LaunchDarkly can be reached from your environment
- If working behind a corporate firewall, ensure outbound connections to `clientstream.launchdarkly.com` are allowed
- For testing on localhost, you may need to configure targeting rules in your LaunchDarkly dashboard to ensure your local users receive the correct flag values
- When setting up targeting rules, use the appropriate context attributes:
  - For premium status: use `kind: user` and attribute: `isPremium`
  - For internal users: check for key `internal-user`

## Running the Application

To start the development server:

```bash
npm run dev
```

This will start the server on the port specified in your `.env` file (default: 5000).

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

The server runs on port 5000 by default. You can customize this by setting the `PORT` environment variable in your `.env` file.

## License

MIT
