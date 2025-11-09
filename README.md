# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application.  
You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine.  
The eventual goal is to create a server with an API and user authorization.

---

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

---

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder.  
The file `sprint.txt` should contain the number of the sprint you're currently working on.  
For example: `12`

---

## Project Structure Overview

project-root/
├── controllers/ # Contains logic for handling requests and responses
│ └── clothingitems.js
│ └── users.js
│
├── models/ # Mongoose schemas and models for MongoDB collections
│ └── clothingitem.js
│ └── user.js
│
├── routes/ # Express route definitions for API endpoints
│ └── clothingitems.js
│ └── users.js
│
├── utils/ # Utility files (error constants, middleware, etc.)
│ └── errors.js
│
├── middlewares/ # Custom middleware (e.g., auth, error handling)
│ └── auth.js
│
├── app.js # Main Express app configuration
├── .eslintrc.js # ESLint configuration (airbnb-base)
├── .env # Environment variables (not committed)
├── package.json # Project dependencies and scripts
└── README.md # Project documentation

---

## Technologies and Techniques Used

- **Express.js** – Backend framework for building RESTful APIs and routing.
- **Node.js** – JavaScript runtime for the server-side environment.
- **MongoDB & Mongoose** – NoSQL database and ODM for modeling, validation, and managing relations.
- **ESLint (airbnb-base)** – Enforces consistent code style and clean syntax.
- **Validator.js** – Used for validating URLs and other user input.
- **Nodemon** – Development tool for automatic server restarts on code changes.
- **dotenv** – Handles environment variables securely.
- **Modular Architecture** – Code structured into `models`, `controllers`, and `routes` for maintainability.
- **REST Principles** – API design follows REST conventions for consistency and scalability.
