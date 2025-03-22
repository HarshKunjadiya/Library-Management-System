import { Router } from "express";
import * as Middleware from "../middleware/Student.js";
import * as Controller from "../controller/Student.js";
import { tokenMiddleware } from "../middleware/tokeMiddleware.js";

const studentRoutes = Router();

studentRoutes.post("/sendMail",Middleware.sendmail);
studentRoutes.post("/signUp",Middleware.signup,Controller.signup);
studentRoutes.get("/login",Middleware.login,Controller.login);
studentRoutes.patch("/changePassword",tokenMiddleware("Student"),Middleware.changePassword,Controller.changePass);
studentRoutes.patch("/forgotPassword",Middleware.forgotPassword,Controller.forgotPassword);
studentRoutes.delete("/delete",tokenMiddleware("Student"),Controller.deleteStudent);
export default studentRoutes;