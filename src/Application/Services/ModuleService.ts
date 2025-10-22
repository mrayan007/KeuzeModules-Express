import BaseService, { IBaseService } from "./BaseService";

import Module from "../../Domain/Entities/Module";
import IModuleRepository from "../../Domain/Repositories/IModuleRepository";
import { IModuleDocument } from "../../Infrastructure/Database/Models/ModuleModel";

export interface IModuleService extends IBaseService<Module> {}

export default class ModuleService extends BaseService<IModuleRepository, Module, IModuleDocument> implements IModuleService {
    constructor(
        moduleRepository: IModuleRepository
    ) {
        super(moduleRepository);
    }
}