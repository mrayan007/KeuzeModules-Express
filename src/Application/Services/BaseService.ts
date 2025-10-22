import BaseEntity from "../../Domain/Entities/BaseEntity";
import IBaseRepository from "../../Domain/Repositories/IBaseRepository";

import { FilterQuery, Document, Types } from "mongoose";

export interface IBaseService<T extends BaseEntity> {
    GetById(id: string): Promise<T>;
    GetAll(where?: FilterQuery<T>): Promise<T[]>;
    Add(entity: T): Promise<void>;
}

export default class BaseService<TRepository extends IBaseRepository<TEntity>, TEntity extends BaseEntity, TDocument extends Document> implements IBaseService<TEntity> {
    constructor(
        protected readonly repository: TRepository
    ) {}

    async GetById(id: string): Promise<TEntity> {
        const entity = await this.repository.GetById(new Types.ObjectId(id));

        return entity;
    }

    async GetAll(where?: FilterQuery<TDocument>): Promise<TEntity[]> {
        const entities = await this.repository.GetAll(where);

        if (entities.length === 0) throw new Error("No entities found.");

        return entities;
    }

    async Add(entity: TEntity): Promise<void> {
        await this.repository.Add(entity);
    }
}