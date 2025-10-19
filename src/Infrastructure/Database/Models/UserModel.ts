import { Document, Schema, model } from "mongoose";

interface IUserDocument extends Document {
    name: string,
    email: string,
    password: string
}

const UserSchema = new Schema<IUserDocument>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true}
});

const UserModel = model<IUserDocument>("User", UserSchema, "Users");
export default UserModel;