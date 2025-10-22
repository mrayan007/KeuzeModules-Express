import { Schema, Document, Types, model } from "mongoose";

export interface IUserDocument extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    favoriteModules: Types.ObjectId[];
}

const UserSchema = new Schema<IUserDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        favoriteModules: [ { type: Types.ObjectId, ref: "Module" } ]
    },

    {
        versionKey: false,
        strict: true
    }
);

const UserModel = model("User", UserSchema, "Users");
export default UserModel;