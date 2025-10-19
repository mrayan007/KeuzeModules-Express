import User from "../Entities/User"

export default interface IAuthRepository {
    createUser(user: User): Promise<void>,
    findByEmail(email: string): Promise<User | null>
}