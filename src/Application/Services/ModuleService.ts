import BaseService from "./BaseService";
import { IBaseService } from "./BaseService";
import Module from "../../Domain/Entities/Module";
import IModuleRepository from "../../Domain/Repositories/IModuleRepository";

interface IModuleService extends IBaseService<Module> {}

export default class ModuleService extends BaseService<IModuleRepository, Module> implements IModuleService {
    constructor(
        moduleRepository: IModuleRepository
    ) {
        super(moduleRepository);
    }
}