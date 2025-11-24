# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application.
This project demonstrates building a RESTful API with user authentication, secure routes, centralized error handling, and database integration.
The ultimate goal is to provide a fully functional server for managing clothing items and user data.

---

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

Ensure MongoDB is running locally at mongodb://127.0.0.1:27017/wtwr_db or update your connection string in app.js.

---

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder.  
The file `sprint.txt` should contain the number of the sprint you're currently working on.  
For example: `12`

---

## Project Structure Overview

project-root/
├── controllers/ # Request handling and business logic
│ └── clothingitems.js
│ └── users.js
│
├── models/ # Mongoose schemas and models
│ └── clothingitem.js
│ └── user.js
│
├── routes/ # Express routes for API endpoints
│ └── clothingitems.js
│ └── users.js
│
├── utils/ # Utility files (error codes, config, etc.)
│ └── errors.js
│ └── config.js
│
├── middlewares/ # Custom middleware
│ └── auth.js # JWT authentication middleware
│ └── errors.js # Centralized error handling middleware
│
├── app.js # Main Express app setup
├── package.json # Project dependencies and scripts
├── .eslintrc.js # ESLint configuration (airbnb-base)
├── .env # Environment variables (not committed)
└── README.md # Project documentation

---

## Key Features Implemented

User Authentication

JWT-based authentication with a reusable auth middleware.

Protected routes that require a valid token.

Standardized 401 responses for unauthorized access.

Error Handling

Centralized error-handling middleware (middlewares/errors.js) catches all errors.

Returns consistent JSON responses with status and message.

Includes a 404 middleware for unmatched routes.

Database Integration

MongoDB used as the database for users and clothing items.

Mongoose schemas define models, validation, and relationships (e.g., linking clothing items to users).

Middleware & Utilities

auth.js ensures secure access to protected routes.

errorHandler middleware manages all application errors.

Default test user middleware allows quick local development without JWT tokens.

Development & Deployment Tools

Nodemon for hot reload during development.

dotenv for environment configuration.

Validator.js for validating user input (e.g., URLs).

## Technologies and Techniques Used

Technologies and Techniques Used

Node.js & Express.js – Server-side runtime and framework.

MongoDB & Mongoose – Database and ODM for schema modeling and validation.

JWT (jsonwebtoken) – Secure route access and authentication.

ESLint (airbnb-base) – Consistent coding style.

Modular Architecture – Separation of concerns: models, controllers, routes, middlewares.

RESTful API Design – CRUD operations follow REST principles.

Centralized Error Handling – Single middleware to handle all errors and status codes.
