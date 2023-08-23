import verifyJWT from "../middleware/verifyJWT";
import * as userController from "../controllers/userController";
import express, {Router} from "express";

//Express Router
const router: Router = express.Router();

//User route and login
router.post("/user", userController.createUser);
router.post("/login", userController.loginUser);

//CRUD Routes
router.get("/users", verifyJWT, userController.getAllUsers);
router.get("/users/:id", verifyJWT, userController.getUserById);
router.put("/users/:id", verifyJWT, userController.updateUser);
router.delete("/users/:id", verifyJWT, userController.deleteUser);

export default router;