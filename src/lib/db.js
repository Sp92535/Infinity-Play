import mongoose from "mongoose";

const DB = process.env.DB_URL

let isConnected = false;

export const connectDB = async () => {
    if (isConnected) return;
    await mongoose.connect(DB);
    isConnected = true;
};