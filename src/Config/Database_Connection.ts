import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const Mongo_URI = process.env.MONGO_URI

if (!Mongo_URI) {
    throw new Error("MONGO_URI is not defined in .env file");
  }

const Database_Creation = mongoose.connect(Mongo_URI)
.then(() => console.log("MongoDB Connected Successfull"))
.catch((err) => console.log("MongoDB Connection Error:", err))

export default Database_Creation;
