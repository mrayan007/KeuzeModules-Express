interface IUser {
    name: string | null,
    email: string,
    password: string
}

export default class User implements IUser {
    constructor(
        public name: string | null,
        public email: string,
        public password: string
    ) {}
}