import AuthService from "../../Application/Services/AuthService";
import UserService from "../../Application/Services/UserService";

import type { Request, Response } from "express";
import type { Mapper } from "@dynamic-mapper/mapper";

import UserProfile from "../../Mapping/Profiles/UserProfile";

import InputUserDTO from "../DTOs/Input/InputUserDTO";

export default class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly mapper: Mapper,
    ) {}

    Register = async (request: Request, response: Response): Promise<void> => {
        const inputUser = response.locals.inputUser;
        
        try {
            await this.authService.Register(inputUser);
            response.status(201).send(`User with E-Mail: ${inputUser.email} has been created successfully.`);
        } catch (error: any) {
            console.log(error);
            response.status(500).send(error.message);
        }
    }

    Login = async (request: Request, response: Response): Promise<void> => {
        try {
            const { email, password } = request.body;
            const inputUser = new InputUserDTO("", email, password);

            const token = await this.authService.Login(inputUser);
            response.cookie("token", token, { httpOnly: true, secure: false,  sameSite: "none",maxAge: 3600 * 1000 });

            const user = await this.userService.GetByEmail(inputUser);
            const userOutput = this.mapper.map(UserProfile.EntityToOutput, user);

            response.status(200).json(userOutput);
        } catch (error: any) {
            console.log(error);
            response.status(500).send(error.message);
        }
    }
}