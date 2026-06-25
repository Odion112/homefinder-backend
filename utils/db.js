import mongoose from "mongoose";

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME,
        });
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error.message);
        console.error("Error connecting to MongoDB")
    }
}