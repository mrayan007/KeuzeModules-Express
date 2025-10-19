import Module from "../../Domain/Entities/Module";
import ModuleService from "../../Application/Services/ModuleService";

import type { Request, Response } from "express";

export default class ModuleController {
    constructor(
        private readonly moduleService: ModuleService
    ) {}

    getAll = async (request: Request, response: Response): Promise<void> => {
        try {
            const modules: Module[] = await this.moduleService.getAll();
            response.status(200).json(modules);
        } catch (error: any) {
            console.error(error);
            response.status(500).send(error.message);
        }
    }
}