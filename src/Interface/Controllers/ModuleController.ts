import ModuleService from "../../Application/Services/ModuleService";

import type { Request, Response } from "express";

export default class ModuleController {
    constructor(
        private readonly moduleService: ModuleService
    ) {}

    getAll = async (request: Request, response: Response): Promise<void> => {
        try {
            const modules = await this.moduleService.getAll();
            
            response.send(modules);
        } catch {
            response.send("Error.");
        }
    }
}