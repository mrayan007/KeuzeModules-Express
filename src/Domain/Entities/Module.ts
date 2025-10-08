interface IModule {
    id: number,
    name: string,
    shortDescription: string,
    description: string,
    content: string,
    credits: number,
    location: string,
    contactId: number,
    level: string,
    learningOutcomes: string
}

export default class Module implements IModule {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly shortDescription: string,
        public readonly description: string,
        public readonly content: string,
        public readonly credits: number,
        public readonly location: string,
        public readonly contactId: number,
        public readonly level: string,
        public readonly learningOutcomes: string
    ) {}
}