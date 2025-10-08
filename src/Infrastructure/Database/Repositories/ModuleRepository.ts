import Module from "../../../Domain/Entities/Module";
import ModuleModel from "../Models/ModuleModel";
import IBaseRepository from "../../../Domain/Repositories/IBaseRepository";

export default class ModuleRepository implements IBaseRepository<Module> {
    async getAll(): Promise<Module[]> {
        const modules = await ModuleModel.find();

        return modules.map(module => new Module(
            module.id,
            module.name,
            module.shortdescription,
            module.description,
            module.content,
            module.studycredit,
            module.location,
            module.contact_id,
            module.level,
            module.learningoutcomes
        ));
    }
}