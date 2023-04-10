import mongoose from "mongoose";

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_URI || '');
        return 'Successfully connected to MongoDB Atlas';
    } catch (error) {
        return new Error(`Error connecting to MongoDB Atlas: ${error}`);
    }
}