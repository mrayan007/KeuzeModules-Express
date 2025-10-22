import { MappingPair, Profile } from "@dynamic-mapper/mapper";

import Module from "../../Domain/Entities/Module";
import { IModuleDocument } from "../../Infrastructure/Database/Models/ModuleModel";

export default class ModuleProfile extends Profile {
    static readonly ToEntity = new MappingPair<IModuleDocument, Module>();

    constructor() {
        super();

        this.createMap(ModuleProfile.ToEntity, {    
            id: opt => opt.mapFrom(src => src._id.toString()),
            name: opt => opt.mapFrom(src => src.name),
            shortDescription: opt => opt.mapFrom(src => src.shortdescription),
            description: opt => opt.mapFrom(src => src.description),
            content: opt => opt.mapFrom(src => src.content),
            studyCredits: opt => opt.mapFrom(src => src.studycredit),
            location: opt => opt.mapFrom(src => src.location),
            contactId: opt => opt.mapFrom(src => src.contact_id),
            level: opt => opt.mapFrom(src => src.level),
            learningOutcomes: opt => opt.mapFrom(src => src.learningoutcomes)
        });
    }
}