import { MappingPair, Profile } from "@dynamic-mapper/mapper";

import User from "../../Domain/Entities/User";
import { IUserDocument } from "../../Infrastructure/Database/Models/UserModel";
import InputUserDTO from "../../Interface/DTOs/Input/InputUserDTO";
import OutputUserDTO from "../../Interface/DTOs/Output/OutputUserDTO";

export default class UserProfile extends Profile {
    static readonly DocumentToEntity = new MappingPair<IUserDocument, User>();
    static readonly InputToEntity = new MappingPair<InputUserDTO, User>();
    static readonly EntityToOutput = new MappingPair<User, OutputUserDTO>();

    constructor() {
        super();

        this.createMap(UserProfile.DocumentToEntity, {
            id: opt => opt.mapFrom(src => src._id.toString()),
            name: opt => opt.mapFrom(src => src.name),
            email: opt => opt.mapFrom(src => src.email),
            password: opt => opt.mapFrom(src => src.password),
            favoriteModules: opt => opt.mapFrom(src =>
                src.favoriteModules?.map(module => module.toString()) ?? []
            )
        });

        this.createMap(UserProfile.InputToEntity, {
            name: opt => opt.mapFrom(src => src.name),
            email: opt => opt.mapFrom(src => src.email),
            password: opt => opt.mapFrom(src => src.password),
            favoriteModules: opt => opt.mapFrom(src => [])
        });
        
        this.createMap(UserProfile.EntityToOutput, {
            id: opt => opt.mapFrom(src => src.id),
            name: opt => opt.mapFrom(src => src.name),
            email: opt => opt.mapFrom(src => src.email),
            favoriteModules: opt => opt.mapFrom(src =>
                src.favoriteModules?.map(module => module.toString()) ?? []
            )
        });
    }
}