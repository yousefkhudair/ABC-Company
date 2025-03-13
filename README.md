
# ABC Company Web Application

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

3. Create environment file (Run in root directory):
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

### Feature Flag Configuration in LaunchDarkly

Each feature flag should be configured as follows:

#### `showFlightStatus` Flag

This flag controls whether the Flight Status tab appears in the booking section.

- **Configuration**: Simple on/off toggle without targeting rules
- **Default Rule**: Set to `true` to show the Flight Status tab for all users
- **Implementation**: No specific targeting rules needed; applies globally to all users

#### `showDealsButton` Flag

This flag controls the visibility of the Deals option in the navigation menu.

- **Configuration**: Target-based rules using the `isPremium` user attribute
- **Targeting Rules**:
  - Create a rule targeting users where `isPremium` is `true`
  - Serve `true` variation to premium users
  - Default rule: Serve `false` variation to all other users
- **Implementation**: The button only appears for premium users

#### `displayDestinations` Flag

This flag controls the visibility of the Popular Destinations section on the home page.

- **Configuration**: Individual targeting using specific user keys
- **Targeting Rules**:
  - Configure individual target for user key `internal-user`
  - Serve `true` variation to internal users
  - Default rule: Serve `false` variation to all other users
- **Implementation**: The section only appears for internal users

### User Context and Targeting

The application includes user context for targeting with the following attributes:
- User types:
  - Internal users (key: 'internal-user')
  - Anonymous users (key: 'anonymous-user')
- Custom attributes:
  - `isPremium`: Boolean attribute for premium user status

The header includes toggles to switch between user types (anon/internal_user) and premium status, which automatically updates the LaunchDarkly context for targeting rules.

#### Testing with Different User Contexts

Use the toggle buttons in the application header to switch between:
- **Standard/Premium**: Toggles the `isPremium` attribute (affects `showDealsButton` flag)
- **Anon/Internal_User**: Toggles between anonymous and internal user keys (affects `displayDestinations` flag)

**Important for Local Development:**
- The LaunchDarkly integration is REQUIRED for this application to function properly
- The application will not show the Flight Status tab, Deals button in header, or Popular Destinations Section without a working LaunchDarkly connection
- Ensure your `.env` file contains a valid LaunchDarkly Client-Side ID before starting the application
- If you see errors about "LaunchDarkly client ID not found" in your console, check that your `.env` file is set up correctly
- Feature flags will only work if LaunchDarkly can be reached from your environment
- If working behind a corporate firewall, ensure outbound connections to `clientstream.launchdarkly.com` are allowed
- Make sure the client ID in your `.env` file is correct and not truncated (should be the full 24-character ID)
- When setting up targeting rules in LaunchDarkly dashboard, use exactly the same attribute names and values as shown above

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
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and shared logic
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main application component
│   │   └── main.tsx      # Application entry point with LaunchDarkly setup
│   └── index.html        # HTML entry point
├── server/               # Backend code
│   ├── index.ts          # Express server setup
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage logic
│   └── vite.ts           # Server-side Vite configuration
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Data schemas
├── .env                  # Environment variables
├── .env.example          # Example environment file
├── drizzle.config.ts     # Drizzle ORM configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
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

The server runs on port 5000 by default. You can customize this by setting the `PORT` environment variable in your `.env` file. See .env.example for reference.

## License

MIT
