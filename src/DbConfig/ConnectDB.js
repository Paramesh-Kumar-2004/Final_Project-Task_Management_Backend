import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export async function ConnectDB() {
    await mongoose.connect(process.env.MONGO_DB_URL)
        .then(() => console.log("Database Connected Successfully..."))
        .catch((err) => console.log("Error While Connecting Database", err))
}