import mongoose from "mongoose";
import 'dotenv/config';
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected successfully");
}).catch((error)=>{
    console.log("Error connecting to MongoDB");
})