import ModuleModel from "../Models/ModuleModel";
import Module from "../../../Domain/Entities/Module";
import IBaseRepository from "../../../Domain/Repositories/IBaseRepository";
import IModuleRepository from "../../../Domain/Repositories/IModuleRepository";

export default class ModuleRepository implements IBaseRepository<Module>, IModuleRepository {
    async getAll(): Promise<Module[]> {
        try {
            const query = ModuleModel.find();
            const modules = await query.exec();
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
        } catch (error) {
            throw new Error(`Sorry, a database error has occurred.`);
        }
    }
}