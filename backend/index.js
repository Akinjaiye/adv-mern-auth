import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";



import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

console.log("MONGO_URI:", process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on port:",PORT);
});