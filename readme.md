# Restful API with Node.js

Short description or tagline about your project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

This application is designed to provide a robust and scalable RESTful API using the Node.js runtime, the Express.js framework, and PostgreSQL as the database management system. With this API, you can create, read, update, and delete data, making it suitable for various application backend needs.

## Features

- **RESTful Routes:** Utilize the full range of RESTful routes for managing resources, including Create, Read, Update, and Delete operations.
- **Scalable Architecture:** The combination of Node.js and Express provides a solid foundation for building scalable and maintainable applications.
- **PostgreSQL Integration:** Leverage the power of PostgreSQL, a powerful open-source relational database, for efficient data storage and retrieval.
- **Middleware:** Employ middleware for tasks such as authentication, validation, and logging to enhance your API's functionality and security.
- **Error Handling:** Implement error handling mechanisms to provide clear and meaningful error messages to clients.
- **Documentation:** Document your API's endpoints, request/response formats, and usage guidelines to facilitate integration for other developers.


## Installation

```bash
# Clone the repository
git clone https://github.com/TomasBodas/restfulAPI_Bodas.git

# Navigate to the project directory
cd restfulAPI_Bodas

# Install dependencies
npm install
```

## Usage

To use the User Management RESTful API, follow these steps:

1. **Database Setup:** Install database.sql in your postgresql installation. Pool details are in db.ts, change if needed.

2. **Start the Server:** Launch the API server.

    ```bash
    npm run dev
    ```

3. **API Endpoints:** Use tools like `curl`, Postman, or any API client to interact with the endpoints. Below are examples of how to use the CRUD operations:

   - **Create User:**

     ```http
     POST /user
     Content-Type: application/json

     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "secretpassword"
     }
     ```

   - **Login:**

     ```http
     POST /login
     Content-Type: application/json

     {
       "name": "John Doe",
       "password": "secretpasswordHASH"
     }
     ```

   - **Get All Users:**

     ```http
     GET /users
     ```

   - **Get User by ID:**

     ```http
     GET /users/:id
     ```

   - **Update User:**

     ```http
     PUT /users/:id
     Content-Type: application/json

     {
       "name": "Updated Name"
     }
     ```

   - **Delete User:**

     ```http
     DELETE /users/:id
     ```
