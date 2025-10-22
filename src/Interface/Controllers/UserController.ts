import type { Request, Response } from "express";

import UserService from "../../Application/Services/UserService";

export default class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    AddModule = async (request: Request, response: Response): Promise<void> => {
        const userId = response.locals.userId;
        const { moduleId } = request.body;

        try {
            if (!moduleId) throw new Error("No module specified.");

            await this.userService.AddModule(userId, moduleId);

            response.status(201).send(`Module: ${moduleId} added to favorites.`);
        } catch (error: any) {
            console.log(error);
            response.status(500).send(error.message);
        }
    }

    DeleteModule = async (request: Request, response: Response): Promise<void> => {
        const userId = response.locals.userId;
        const { moduleId } = request.query;

        try {
            if (!moduleId) throw new Error("No module specified.");

            await this.userService.DeleteModule(userId, moduleId.toString());

            response.status(201).send(`Module: ${moduleId} deleted from favorites.`);
        } catch (error: any) {
            console.log(error);
            response.status(500).send(error.message);
        }
    }
}