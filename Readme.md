# Task Manager

Task Manager is a simple task management system built on Node.js, Express.js and MongoDB. It allows users to create, update, delete and view tasks. Tasks can also be assigned to other users.

## Features

- User authentication and authorization
- Task creation, update and deletion
- Task assignment to other users
- Task viewing and filtering

## Installation

1. Clone the repository using `git clone https://github.com/your-username/task-manager.git`
2. Install the dependencies using `npm install`
3. Start the server using `npm start`
4. Open `http://localhost:3000` in your browser to access the application

## Configuration

The application uses environment variables for configuration. The following variables need to be set:

- `MONGO_URL`: The URL of the MongoDB database
- `JWT_SECRET`: The secret used for JSON Web Tokens
- `EMAIL_USER`: The email address used for sending emails
- `EMAIL_PASS`: The password used for sending emails

These variables can be set in a `.env` file in the root of the project.

## API Endpoints

### Users

- `POST /users`: Create a new user
- `GET /users`: Get all users
- `GET /users/:id`: Get a user by ID
- `PATCH /users/:id`: Update a user
- `DELETE /users/:id`: Delete a user

### Tasks

- `POST /tasks`: Create a new task
- `GET /tasks`: Get all tasks
- `GET /tasks/:id`: Get a task by ID
- `PATCH /tasks/:id`: Update a task
- `DELETE /tasks/:id`: Delete a task

### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login a user
- `GET /auth/logout`: Logout a user
