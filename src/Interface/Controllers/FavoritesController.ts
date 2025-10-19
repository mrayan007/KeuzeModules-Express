import type { Request, Response } from "express";
import FavoritesService from "../../Application/Services/FavoritesService";
import FavoriteModule from "../../Domain/Entities/FavoriteModule";
import { request } from "http";

export default class FavoritesController {
    constructor(
        private readonly favoritesService: FavoritesService
    ) {}

    addModule = async (request: Request, response: Response) => {
        try {
            if (!request.body.email || !request.body.id) {
                throw new Error("Invalid parameters");
            }
            const favoriteModule = new FavoriteModule(request.body.email, request.body.id);
            await this.favoritesService.addModule(favoriteModule);
            response.status(200).send("Module added to favorites");
        } catch (error: any) {
            console.error(error);
            response.status(400).send(error.message);
        }
    }

    getModules = async (request: Request, response: Response) => {
        try {
            if (!request.params.email) {
                throw new Error("Invalid parameters");
            }

            const modules = await this.favoritesService.getModules(request.params.email);
            response.status(200).json(modules);
        } catch (error: any) {
            console.log(error);
            response.status(500).send(error.message);
        }
    }

    deleteModule = async (request: Request, response: Response) => {
        try {
            if (!request.body.email || !request.body.id) {
                throw new Error("Invalid parameters");
            }
            const favoriteModule = new FavoriteModule(request.body.email, request.body.id);
            await this.favoritesService.deleteModule(favoriteModule);
            response.status(200).send("Module deleted");
        } catch (error: any) {
            console.error(error);
            response.status(400).send(error.message);
        }
    }
}