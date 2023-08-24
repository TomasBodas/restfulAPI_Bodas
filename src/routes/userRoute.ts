import express, { Router } from "express";
import verifyJWT from "../middleware/verifyJWT";
import * as userController from "../controllers/userController";

// Create an Express Router instance
const router: Router = express.Router();

// User registration and login routes
router.post("/user", userController.createUser); // Create a new user
router.post("/login", userController.loginUser); // User login

// CRUD Routes for managing users
router.get("/users", verifyJWT, userController.getAllUsers); // Get all users
router.get("/users/:id", verifyJWT, userController.getUserById); // Get a user by ID
router.put("/users/:id", verifyJWT, userController.updateUser); // Update a user by ID
router.delete("/users/:id", verifyJWT, userController.deleteUser); // Delete a user by ID

export default router;
