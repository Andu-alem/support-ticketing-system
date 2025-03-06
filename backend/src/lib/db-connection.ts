import mongoose from "mongoose";
import dotenv from "dotenv";

type Mongo = typeof import('mongoose');

dotenv.config();

const DB_URI = process.env.DATABASE_URL;
if (!DB_URI) {
    throw new Error("Please define database uri in env.local file.")
}
let globalWithMongo = global as typeof globalThis & { mongo: Mongo }
let cached:Mongo|null = globalWithMongo.mongo

export async function connect() {
    try {
        if (cached) {
            return cached;
        }
        cached = await mongoose.connect(DB_URI ?? '');
        console.log("Connected to the database successfuly");
        
        return cached
    } catch(e) {
        console.error("Couldn't connect to the database.");
    }
}