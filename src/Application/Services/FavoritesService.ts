import FavoriteModule from "../../Domain/Entities/FavoriteModule"
import IFavoritesRepository from "../../Domain/Repositories/IFavoritesRepository"
import Module from "../../Domain/Entities/Module"

interface IFavoritesService {
    addModule(favoriteModule: FavoriteModule): Promise<void>,
    getModules(userEmail: string): Promise<Module[]>,
    deleteModule(favoriteModule: FavoriteModule): Promise<void>
}

export default class FavoritesService implements IFavoritesService {
    constructor(
        private readonly favoritesRepository: IFavoritesRepository
    ) {}

    async addModule(favoriteModule: FavoriteModule): Promise<void> {
        const moduleAlreadyAdded: boolean = await this.favoritesRepository.checkExistence(favoriteModule) ? true : false;
        if (moduleAlreadyAdded) throw new Error("Module already added to favorites");

        await this.favoritesRepository.addModule(favoriteModule);
    }

    async getModules(userEmail: string): Promise<Module[]> {
        const modules = await this.favoritesRepository.getModulesByEmail(userEmail);
        if (modules.length === 0) throw new Error("No favorite modules yet");

        return modules;
    }

    async deleteModule(favoriteModule: FavoriteModule): Promise<void> {
        await this.favoritesRepository.deleteModule(favoriteModule);
    }
}