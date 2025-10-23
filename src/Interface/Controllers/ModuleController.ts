    import { IModuleService } from "../../Application/Services/ModuleService";
    import Module from "../../Domain/Entities/Module";
    import { IModuleDocument } from "../../Infrastructure/Database/Models/ModuleModel";

    import type { Request, Response } from "express";

    import { FilterQuery } from "mongoose";

    export default class ModuleController {
        constructor(
            private readonly moduleService: IModuleService
        ) {}

        GetModules = async (request: Request, response: Response): Promise<void> => {
            let where: FilterQuery<IModuleDocument> = {};
            const { id, name, studyCredits, level, location } = request.query;

            if (id) where._id = id;
            if (name) where.name = name;
            if (studyCredits) where.studycredit = Number(studyCredits);
            if (level) where.level = level;
            if (location) where.location = location;
            
            try {
                const modules: Module[] = await this.moduleService.GetAll(where);
                response.status(200).json(modules);
            } catch (error: any) {
                console.log(error);
                response.status(500).send(error.message);
            }
        }

        FindModule = async (request: Request, response: Response): Promise<void> => {
            const { id } = request.params;
            if (!id) throw new Error("No Module ID provided.");

            try {
                const module = await this.moduleService.GetById(id);
                response.status(200).json(module);
            } catch (error: any) {
                console.log(error);
                response.status(500).send(error.message);
            }
        }
    }