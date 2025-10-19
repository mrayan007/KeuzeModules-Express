import User from "../../Domain/Entities/User";
import AuthService from "../../Application/Services/AuthService";
import mapper from "../../mapper";
import { OutputUser, LoginInputToUser, RegisterInputToUser } from "../../mapper";
import type { Request, Response } from "express";
import { InputLoginUserDTO, InputRegisterUserDTO } from "../DTOs/input";

export default class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    register = async (request: Request, response: Response): Promise<void> => {
        const inputUserDTO = new InputRegisterUserDTO();
        inputUserDTO.name = request.body.name;
        inputUserDTO.email = request.body.email;
        inputUserDTO.password = request.body.password;
        
        try {
            const user = mapper.map(RegisterInputToUser, inputUserDTO);
            await this.authService.register(user);
            response.status(200).send("User registered successfully.");
        } catch (error: any) {
            console.error(error);
            response.status(500).send(error.message);
        }
    }

    login = async (request: Request, response: Response): Promise<void> => {
        const inputUserDTO = new InputLoginUserDTO();
        inputUserDTO.email = request.body.email;
        inputUserDTO.password = request.body.password;

        try {
            const user = mapper.map(LoginInputToUser, inputUserDTO);
            const token = await this.authService.login(user);
            response.cookie("token", token, { httpOnly: true, secure: false, maxAge: 3600 * 1000});
            const userInfo = await this.authService.getUserInfo(user);
            const userOutput = mapper.map(OutputUser, userInfo);
            response.status(200).json(userOutput);
        } catch (error: any) {
            console.error(error);
            response.status(401).send(error.message);
        }
    }
}