import IBaseRepository from "./IBaseRepository";

import User from "../Entities/User";

export default interface IUserRepository extends IBaseRepository<User> {
    FindByEmail(email: string): Promise<User | null>;
    AddModule(userId: string, moduleId: string): Promise<void>;
    DeleteModule(userId: string, moduleId: string): Promise<void>;
}