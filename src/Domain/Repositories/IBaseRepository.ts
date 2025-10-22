import BaseEntity from "../Entities/BaseEntity";

import { FilterQuery, Types } from "mongoose";

export default interface IBaseRepository<T extends BaseEntity> {
    GetById(id: Types.ObjectId): Promise<T>;
    GetAll(where?: FilterQuery<T>): Promise<T[]>;
    Add(entity: T): Promise<void>;
    Update(entity: T, toUpdate: Record<string, any>): Promise<void>;
    Delete(entity: T): Promise<void>;
}