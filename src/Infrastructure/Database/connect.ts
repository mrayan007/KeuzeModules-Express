import mongoose from "mongoose";

export async function MongoDB(dbName : string | undefined) {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}${dbName}`);
        console.log(`Successfully connected to ${dbName}`);
    } catch(error : unknown) {
        console.log(error);
        process.exit();
    }
}