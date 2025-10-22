import InputUserDTO from "../../Interface/DTOs/Input/InputUserDTO";
import UserProfile from "../../Mapping/Profiles/UserProfile";
import UserService from "./UserService";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Mapper } from "@dynamic-mapper/mapper"

export interface IAuthService  {
    Register(inputUser: InputUserDTO): Promise<void>;
    Login(inputUser: InputUserDTO): Promise<string>;
}

export default class AuthService implements IAuthService {
    constructor(
        private readonly userService: UserService,
        private readonly mapper: Mapper
    ) {}

    async Register(inputUser: InputUserDTO): Promise<void> {
        if (await this.userService.GetByEmail(inputUser)) throw new Error(`A User with E-Mail: ${inputUser.email} already exists.`);

        inputUser.password = await bcrypt.hash(inputUser.password, 10);

        const user = this.mapper.map(UserProfile.InputToEntity, inputUser);
        await this.userService.Add(user);
    }

    async Login(inputUser: InputUserDTO): Promise<string> {
        const user = await this.userService.GetByEmail(inputUser);
        if (!user) throw new Error(`A User with the E-Mail: ${inputUser.email} doesn't exist.`);

        if (!await bcrypt.compare(inputUser.password, user.password)) throw new Error("The password is incorrect.");

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY as string, { expiresIn: "15m" });
        return token;
    }
}