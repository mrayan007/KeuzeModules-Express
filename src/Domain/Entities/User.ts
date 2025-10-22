import BaseEntity from "./BaseEntity";

interface IUser {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    favoriteModules?: string[];
}

export default class User extends BaseEntity implements IUser {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public favoriteModules: string[]
    ) {
        super(id);
    }
}