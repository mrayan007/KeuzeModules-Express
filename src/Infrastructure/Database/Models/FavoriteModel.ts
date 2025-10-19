import { Document, Schema, model } from "mongoose";

interface IFavoriteDocument extends Document {
    userEmail: string,
    moduleId: number
}

const FavoriteSchema = new Schema<IFavoriteDocument>({
    userEmail: String,
    moduleId: Number
});

const FavoriteModel = model<IFavoriteDocument>("Favorite", FavoriteSchema, "Favorites");
export default FavoriteModel;