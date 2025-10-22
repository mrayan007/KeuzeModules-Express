import { Router } from "express";

import UserRepository from "../../Infrastructure/Database/Repositories/UserRepository";
import UserService from "../../Application/Services/UserService";
import UserController from "../Controllers/UserController";

import AuthenticateUser from "../Middleware/AuthenticateUser";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/favorite', AuthenticateUser, userController.AddModule);
router.delete('/favorite', AuthenticateUser, userController.DeleteModule);

export default router;