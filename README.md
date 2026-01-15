# WTWR (What to Wear?): Back End

The back-end project provides the server-side functionality for the WTWR (What to Wear?) full-stack application.  
It implements a RESTful API with user authentication, protected routes, centralized error handling, request validation, logging, and cloud deployment.

The goal of this project is to deliver a production-ready backend that securely manages users and clothing items and supports the deployed frontend application.

---

## 🚀 Running the Project Locally

`npm run start` — start the server

`npm run dev` — start the server with hot reload (nodemon)

Ensure MongoDB is running locally at:

`mongodb://127.0.0.1:27017/wtwr_db`

If needed, update the connection string in `app.js`.

---

## 🧪 Testing Notes

Before committing your code, update the `sprint.txt` file in the root directory.

Example:
`15`

---

## 📁 Project Structure Overview

project-root/
├── controllers/
│ ├── clothingitems.js
│ └── users.js
│
├── models/
│ ├── clothingitem.js
│ └── user.js
│
├── routes/
│ ├── clothingitems.js
│ └── users.js
│
├── middlewares/
│ ├── auth.js
│ ├── validation.js
│ ├── logger.js
│ └── error-handler.js
│
├── errors/
│ ├── bad-request-err.js
│ ├── unauthorized-err.js
│ ├── forbidden-err.js
│ ├── not-found-err.js
│ └── conflict-err.js
│
├── app.js
├── package.json
├── .eslintrc.js
└── README.md

---

## ✨ Key Features Implemented

### User Authentication
- JWT-based authentication
- Secure sign-up and sign-in routes
- Protected routes using reusable auth middleware
- Standardized 401 responses for unauthorized access

### Centralized Error Handling
- Custom error classes for common HTTP errors
- Single error-handling middleware (`error-handler.js`)
- Consistent JSON error responses
- Catch-all 404 handler for unknown routes

### Request Validation
- Validation middleware using Joi, Celebrate, and Validator
- Prevents invalid data from reaching controllers
- Improves API safety and reliability

### Logging
- Request and error logging with Winston
- Separate logs for requests and errors
- Logs useful debugging information without exposing sensitive data

### Database Integration
- MongoDB used for persistent data storage
- Mongoose schemas define models and relationships
- Clothing items are linked to user ownership

---

## ☁️ Deployment & Reliability

- Deployed on a Google Cloud Virtual Machine
- Nginx configured as a reverse proxy
- HTTPS / SSL enabled for secure communication
- Application managed by PM2
- Crash-test route used to verify automatic recovery

---

## 🌐 Deployed Project Access

- Frontend:  
  https://lizmary-wtwr.shareroute.org

- Backend API:  
  https://api.lizmary-wtwr.shareroute.org

- Frontend Repository:  
  https://github.com/lizmary0209/se_project_react

---

## 🎥 Project Pitch Video (Project 15)

Check out [this video](https://drive.google.com/file/d/164czWpWm59-eEi3Zwks7LQVhzVIADq0Z/view?usp=sharing), where I walk through the WTWR full-stack project, backend middleware, deployment process, challenges faced, and future improvements.

---

## 📼 Previous Sprint Video

- Sprint 13 Video:  
  https://drive.google.com/file/d/19mHliSHrfSh9bdEwX2dx-skMy3phpOLK/view?usp=sharing

---

## 🛠️ Technologies & Tools Used

- Node.js & Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- Celebrate / Joi / Validator
- Winston
- PM2
- Nginx
- Google Cloud VM
- ESLint (airbnb-base)
- RESTful API design

---

## 📌 Summary

This project demonstrates building, securing, validating, logging, and deploying a modern backend API.  
It reflects real-world backend practices, cloud deployment experience, and production readiness.

