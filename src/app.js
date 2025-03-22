import express from "express";
import 'dotenv/config';
import adminRoutes from "./routes/Admin.js";
import studentRoutes from "./routes/Student.js";
import bookRoutes from "./routes/Books.js";
import { job } from "./cron Job/daily.js"; 
const app = express();
app.use(express.json());

job.start();
app.use("/Admin",adminRoutes);
app.use("/Student",studentRoutes);
app.use("/Books",bookRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
