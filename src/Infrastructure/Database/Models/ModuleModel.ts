import { Document, Schema, model } from "mongoose";

interface IModuleDocument extends Document {
    id: number,
    name: string,
    shortdescription: string,
    description: string,
    content: string,
    studycredit: number,
    location: string,
    contact_id: number,
    level: string,
    learningoutcomes: string
}

const ModuleSchema = new Schema<IModuleDocument>({
    id: Number,
    name: String,
    shortdescription: String,
    description: String,
    content: String,
    studycredit: Number,
    location: String,
    contact_id: Number,
    level: String,
    learningoutcomes: String
});

const ModuleModel = model<IModuleDocument>("Module", ModuleSchema, "VrijeKeuzeModules");

export default ModuleModel;