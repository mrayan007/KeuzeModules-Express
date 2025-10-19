import { Router } from "express";
import AuthController from "../Controllers/AuthController";
import AuthService from "../../Application/Services/AuthService";
import AuthRepository from "../../Infrastructure/Database/Repositories/AuthRepository";

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;