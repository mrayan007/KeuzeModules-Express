import IFavoritesRepository from "../../../Domain/Repositories/IFavoritesRepository";
import FavoriteModel from "../Models/FavoriteModel";
import Module from "../../../Domain/Entities/Module";
import FavoriteModule from "../../../Domain/Entities/FavoriteModule";

export default class FavoritesRepository implements IFavoritesRepository {
    async addModule(favoriteModule: FavoriteModule): Promise<void> {
        try {
            await FavoriteModel.create(favoriteModule);
        } catch {
            throw new Error("Failed to favorite a module");
        }
    }

    async checkExistence(favoriteModule: FavoriteModule): Promise<FavoriteModule | null> {
        try {
            const query = FavoriteModel.findOne(favoriteModule);
            const module = await query.exec();
            if (!module) return null;
            return new FavoriteModule(
                module.userEmail,
                module.moduleId
            );
        } catch {
            throw new Error("Failed to fetch favorite module");
        }
    }

    async getModulesByEmail(userEmail: string): Promise<Module[]> {
        try {
            const modules = await FavoriteModel.aggregate([
                { $match: { userEmail } },
                {
                    $lookup: {
                        from: "Modules",
                        localField: "moduleId",
                        foreignField: "id",
                        as: "module"
                    }
                },
                { $unwind: "$module" },
                { $replaceRoot: { newRoot: "$module" } }
            ]);

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
        } catch {
            throw new Error("Failed to fetch favorite modules");
        }
    }


    async deleteModule(favoriteModule: FavoriteModule): Promise<void> {
        try {
            await FavoriteModel.deleteOne(favoriteModule);
        } catch {
            throw new Error("Failed to delete favorite module");
        }
    }
}