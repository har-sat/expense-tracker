import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

export const connectToDatabase = async () => {
  if (!DB_URI) {
    throw new Error("Databse URL doesn't exist");
  }
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to database succesfully");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
