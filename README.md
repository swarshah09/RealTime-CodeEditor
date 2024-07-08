Sure! Here is the content formatted as a `README.md` file:

```markdown
# RealTime-CodeEditor

A real-time collaborative code editor built with React, Express, Socket.io, and various other technologies. This project allows multiple users to edit code simultaneously with live updates, compile code, and see who is typing in real-time.

## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [License](#license)

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
- Code compilation and execution
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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
