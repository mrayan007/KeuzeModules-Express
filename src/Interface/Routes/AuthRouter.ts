import { Router } from "express";

import AuthController from "../Controllers/AuthController";
import AuthService from "../../Application/Services/AuthService";

import mapper from "../../Mapping/mapper";

import UserService from "../../Application/Services/UserService";
import UserRepository from "../../Infrastructure/Database/Repositories/UserRepository";

import { RegistrationValidationRules, ValidateRegistration } from "../Middleware/ValidateRegistration";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userService, mapper);
const authController = new AuthController(authService, userService, mapper);

router.post('/register', RegistrationValidationRules, ValidateRegistration, authController.Register);
router.post('/login', authController.Login);

export default router;