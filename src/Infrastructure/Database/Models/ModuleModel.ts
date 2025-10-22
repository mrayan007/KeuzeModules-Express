import { Schema, Document, Types, model } from "mongoose";

export interface IModuleDocument extends Document {
    _id: Types.ObjectId;
    name: string;
    shortdescription: string;
    description: string;
    content: string;
    studycredit: number;
    location: string;
    contact_id: number;
    level: string;
    learningoutcomes: string;
}

const ModuleSchema = new Schema<IModuleDocument>(
    {
        name: String,
        shortdescription: String,
        description: String,
        content: String,
        studycredit: Number,
        location: String,
        contact_id: Number,
        level: String,
        learningoutcomes: String
    },
    
    {
        versionKey: false,
        strict: true
    }
);

const ModuleModel = model<IModuleDocument>("Module", ModuleSchema, "Modules");
export default ModuleModel;