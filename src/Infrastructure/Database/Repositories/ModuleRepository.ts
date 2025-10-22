import BaseRepository from "./BaseRepository";

import Module from "../../../Domain/Entities/Module";
import IModuleRepository from "../../../Domain/Repositories/IModuleRepository";
import ModuleModel, { IModuleDocument } from "../Models/ModuleModel";
import ModuleProfile from "../../../Mapping/Profiles/ModuleProfile";

import mapper from "../../../Mapping/mapper";

export default class ModuleRepository extends BaseRepository<Module, IModuleDocument> implements IModuleRepository {
    constructor() {
        super(ModuleModel, mapper, ModuleProfile.ToEntity);
    }
}