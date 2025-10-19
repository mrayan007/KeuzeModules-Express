interface IFavoriteModule {
    userEmail: string,
    moduleId: number
}

export default class FavoriteModule implements IFavoriteModule {
    constructor(
        public userEmail: string,
        public moduleId: number
    ) {}
}