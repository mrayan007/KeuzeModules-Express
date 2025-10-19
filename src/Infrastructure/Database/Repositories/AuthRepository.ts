import User from "../../../Domain/Entities/User";
import IAuthRepository from "../../../Domain/Repositories/IAuthRepository";
import UserModel from "../Models/UserModel";

export default class AuthRepository implements IAuthRepository {
    async createUser(user: User): Promise<void> {
        try {
            await UserModel.create(user);
        } catch (error) {
            throw new Error("Failed to create user.");
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const query = UserModel.findOne({"email": email});
            const user = await query.exec();
            if (!user) return null;
            return new User(
                user.name,
                user.email,
                user.password
            );
        } catch (error) {
            throw new Error("Failed to fetch user.");
        }
    }
}