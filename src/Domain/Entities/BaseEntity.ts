interface IBaseEntity {
    id: string;
}

export default class BaseEntity implements IBaseEntity {
    constructor(
        public id: string
    ) {}
}