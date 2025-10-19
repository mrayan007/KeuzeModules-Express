import User from "../../Domain/Entities/User"
import IAuthRepository from "../../Domain/Repositories/IAuthRepository"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface IAuthService {
    register(user: User): Promise<void>,
    login(user: User): Promise<string>,
    getUserInfo(user: User): Promise<User>
}

export default class AuthService implements IAuthService {
    constructor(
        private readonly authRepository: IAuthRepository
    ) {}

    async register(user: User): Promise<void> {
        if (!user.email.endsWith("@student.avans.nl")) {
            throw new Error("You need to have an Avans Student email.");
        }

        const userAlreadyExists: boolean = await this.authRepository.findByEmail(user.email) == null? false : true;
        if (userAlreadyExists) throw new Error("This email is already taken.");

        user.password = await bcrypt.hash(user.password, 10);
        await this.authRepository.createUser(user);
    }

    async login(userInput: User): Promise<string> {
        const user = await this.authRepository.findByEmail(userInput.email);
        if (!user) throw new Error("This user doesn't exist.");

        const passwordIsValid = await bcrypt.compare(userInput.password, user.password);
        if (!passwordIsValid) throw new Error("Password is incorrect");

        const token = jwt.sign({ email: user.email }, process.env.JWT_KEY as string, { expiresIn: "1h" });
        return token;
    }

    async getUserInfo(userInput: User): Promise<User> {
        const user = await this.authRepository.findByEmail(userInput.email);
        if (!user) throw new Error("This user doesn't exist.");
        return user;
    }
}