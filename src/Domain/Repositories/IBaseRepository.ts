export default interface IBaseRepository<T> {
    getAll(): Promise<T[]>;
}