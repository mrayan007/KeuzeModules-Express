import BaseEntity from "./BaseEntity";

interface IModule {
    id: string;
    name?: string;
    shortDescription?: string;
    description?: string;
    content?: string;
    studyCredits?: number;
    location?: string;
    contactId?: number;
    level?: string;
    learningOutcomes?: string;
}

export default class Module extends BaseEntity implements IModule {
    constructor(
        public id: string,
        public name: string,
        public shortDescription: string,
        public description: string,
        public content: string,
        public studyCredits: number,
        public location: string,
        public contactId: number,
        public level: string,
        public learningOutcomes: string
    ) {
        super(id);
    }
}