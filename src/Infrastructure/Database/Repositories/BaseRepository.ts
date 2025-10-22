import BaseEntity from "../../../Domain/Entities/BaseEntity";

import IBaseRepository from "../../../Domain/Repositories/IBaseRepository";

import { Model, Document, FilterQuery, Types } from "mongoose";
import { Mapper, MappingPair } from "@dynamic-mapper/mapper";

export default class BaseRepository<TEntity extends BaseEntity, TDocument extends Document> implements IBaseRepository<TEntity> {
    constructor(
        protected readonly model: Model<TDocument>,
        protected readonly mapper: Mapper,
        protected readonly mappingPair: MappingPair<TDocument, TEntity>
    ) {}

    async GetById(id: Types.ObjectId): Promise<TEntity> {
        try {
            const entity = await this.model.findById(id);

            if (!entity) throw new Error(`No ${this.model.modelName} found with ID: ${id}`);

            return this.mapper.map(this.mappingPair, entity);
        } catch (error: unknown) {
            throw new Error(`Failed to fetch ${this.model.modelName} with ID: ${id}`);
        }
    }

    async GetAll(where?: FilterQuery<TDocument>): Promise<TEntity[]> {
        try {
            let query = this.model.find();

            if (where) {
                query = this.model.find(where);
            }

            const entities = await query.exec();

            return (
                entities.map(entity =>
                    this.mapper.map(this.mappingPair, entity)
                )
            );
        } catch (error: unknown) {
            throw new Error(`Failed to fetch ${this.model.modelName}s.`)
        }
    }

    async Add(entity: TEntity): Promise<void> {
        try {
            await this.model.create(entity);
        } catch (error: unknown) {
            throw new Error(`Failed to create a new ${this.model.modelName}.`);
        }
    }

    async Update(entity: TEntity, toUpdate: Record<string, any>): Promise<void> {
        try {
            await this.model.updateOne(
                { _id: entity.id },
                { $set: toUpdate }
            );
        } catch (error: unknown) {
            throw new Error(`Failed to update the ${this.model.modelName} with ID: ${entity.id}`);
        }
    }

    async Delete(entity: TEntity): Promise<void> {
        try {
            await this.model.deleteOne(entity);
        } catch (error: unknown) {
            throw new Error(`Failed to delete the ${this.model.modelName} with ID: ${entity.id}.`);
        }
    }
}