![codeconnection-high-resolution-logo-transparent](https://github.com/swarshah09/da/assets/90791181/8a2a9cb9-f21c-40ef-a595-6b2d7689eaaa)

A real-time collaborative code editor built with React, Express, Socket.io, and various other technologies. This project allows multiple users to edit code simultaneously with live updates, compile code, and see who is typing in real-time.

## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/swarshah09/RealTime-CodeEditor.git
   cd RealTime-CodeEditor
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Set up environment variables. Create a `.env` file in the root directory and add:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```

4. Start the development server:
   ```sh
   yarn start:front
   ```

5. Start the backend server:
   ```sh
   yarn server:dev
   ```

## Features

- Real-time collaborative editing
- Typing indicators for multiple users
- Time spent in a room
- Download the text file
- User authentication and session management

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **@monaco-editor/react**: React wrapper for the Monaco Editor, the code editor that powers VS Code.
- **react-codemirror**: CodeMirror component for React.
- **react-hot-toast**: Notifications and toasts.
- **react-icons**: Popular icon sets for React.
- **react-router-dom**: Declarative routing for React applications.
- **react-select**: Select input component for React.

### Backend
- **Express**: A minimal and flexible Node.js web application framework.
- **socket.io**: Enables real-time, bidirectional, and event-based communication.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **axios**: Promise based HTTP client for the browser and node.js.
- **uuid**: For generating unique identifiers.

### Demo Video
https://github.com/swarshah09/da/assets/90791181/6e49ca30-af2d-434c-86ac-09d7ce6d3279

### Testing
- **@testing-library/jest-dom**: Custom jest matchers to test the state of the DOM.
- **@testing-library/react**: Simple and complete React DOM testing utilities that encourage good testing practices.
- **@testing-library/user-event**: Simulates user events.

### Other Tools
- **nodemon**: Automatically restarts the node application when file changes are detected.
- **web-vitals**: Library to measure the performance of your web app.

## Environment Variables

The following environment variables need to be set:

- `REACT_APP_BACKEND_URL`: URL of the backend service.

## Scripts

- `yarn start:front`: Start the React development server.
- `yarn start`: Build the application and start the production server.
- `yarn build`: Build the React application.
- `yarn server:dev`: Start the backend server in development mode with nodemon.
- `yarn server:prod`: Start the backend server in production mode.
- `yarn test`: Run the test suite.
- `yarn eject`: Eject the React app configuration.
- `yarn postinstall`: Ensure `react-scripts` is installed.

## Deployment

To deploy this application, ensure the following configuration is set in your deployment service (e.g., Render):

- **Build Command:** `yarn build`
- **Start Command:** `yarn start`
- **Environment Variables:** 
  - `REACT_APP_BACKEND_URL`: URL of your backend service (e.g., `https://your-backend-service.onrender.com`).

### Render Deployment Example

- **Name:** `RealTime-CodeEditor`
- **Language:** `Node`
- **Branch:** `main`
- **Region:** `Oregon (US West)`
- **Build Command:** `yarn build`
- **Start Command:** `yarn start`
