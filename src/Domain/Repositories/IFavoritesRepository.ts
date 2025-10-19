import FavoriteModule from "../Entities/FavoriteModule";
import Module from "../Entities/Module";

export default interface IFavoritesRepository {
    addModule(favoriteModule: FavoriteModule): Promise<void>,
    checkExistence(favoriteModule: FavoriteModule): Promise<FavoriteModule | null>,
    getModulesByEmail(userEmail: string): Promise<Module[]>,
    deleteModule(favoriteModule: FavoriteModule): Promise<void>
}