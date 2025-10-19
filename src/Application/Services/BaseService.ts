import IBaseRepository from "../../Domain/Repositories/IBaseRepository";

export interface IBaseService<T> {
    getAll(): Promise<T[]>;
}

export default class BaseService<TRepository extends IBaseRepository<TEntity>, TEntity > implements IBaseService<TEntity> {
    constructor(
        private readonly repository: TRepository
    ) {}
    
    async getAll(): Promise<TEntity[]> {
        const entities = await this.repository.getAll();

        if (entities.length === 0) throw new Error("Sorry, no entities found.");
        
        return entities;
    }
}