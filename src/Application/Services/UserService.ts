import BaseService, { IBaseService } from "./BaseService";

import User from "../../Domain/Entities/User";
import IUserRepository from "../../Domain/Repositories/IUserRepository";
import { IUserDocument } from "../../Infrastructure/Database/Models/UserModel";
import InputUserDTO from "../../Interface/DTOs/Input/InputUserDTO";

export interface IUserService extends IBaseService<User> {
    GetByEmail(inputUser: InputUserDTO): Promise<User | null>;
    AddModule(userId: string, moduleId: string): Promise<void>;
    DeleteModule(userId: string, moduleId: string): Promise<void>;
}

export default class UserService extends BaseService<IUserRepository, User, IUserDocument> implements IUserService {
    constructor(
        userRepository: IUserRepository
    ) {
        super(userRepository);
    }

    async GetByEmail(inputUser: InputUserDTO): Promise<User | null> {
        const user = await this.repository.FindByEmail(inputUser.email);
        return user;
    }

    async AddModule(userId: string, moduleId: string): Promise<void> {
        await this.repository.AddModule(userId, moduleId);
    }

    async DeleteModule(userId: string, moduleId: string): Promise<void> {
        await this.repository.DeleteModule(userId, moduleId);
    }
}