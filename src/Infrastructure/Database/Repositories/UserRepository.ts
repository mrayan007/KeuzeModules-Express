import BaseRepository from "./BaseRepository";

import mapper from "../../../Mapping/mapper";

import User from "../../../Domain/Entities/User";
import UserModel , { IUserDocument } from "../Models/UserModel";
import IUserRepository from "../../../Domain/Repositories/IUserRepository";
import UserProfile from "../../../Mapping/Profiles/UserProfile";

export default class UserRepository extends BaseRepository<User, IUserDocument> implements IUserRepository {
    constructor() {
        super(UserModel, mapper, UserProfile.DocumentToEntity);
    }

    async FindByEmail(email: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({ email: email });
            if (!user) return null;
            return mapper.map(UserProfile.DocumentToEntity, user);
        } catch (error: unknown) {
            console.log(error);
            throw new Error(`Failed to fetch the User with E-Mail: ${email}`)
        }
    }

    async AddModule(userId: string, moduleId: string): Promise<void> {
        console.log(userId);
        try {
            await UserModel.updateOne({ _id: userId }, { $addToSet: { favoriteModules: moduleId } });
        } catch (error: unknown) {
            console.log(error);
            throw new Error(`Failed to add Module: ${moduleId} to favorites.`);
        }
    }

    async DeleteModule(userId: string, moduleId: string): Promise<void> {
        try {
            await UserModel.updateOne({ _id: userId }, { $pull: { favoriteModules: moduleId } });
        } catch (error: unknown) {
            console.log(error);
            throw new Error(`Failed to delete Module: ${moduleId} from favorites.`);
        }
    }
}