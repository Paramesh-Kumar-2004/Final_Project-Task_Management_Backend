// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();


// export async function ConnectDB() {
//     await mongoose.connect(process.env.MONGO_DB_URL)
//         .then(() => console.log("Database Connected Successfully..."))
//         .catch((err) => console.log("Error While Connecting DB", err))
// }


import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL;

if (!MONGO_DB_URL) {
    throw new Error("MONGO_DB_URL is not defined in environment variables");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function ConnectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_DB_URL, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        });
    }

    cached.conn = await cached.promise;
    console.log("Database Connected Successfully...");
    return cached.conn;
}