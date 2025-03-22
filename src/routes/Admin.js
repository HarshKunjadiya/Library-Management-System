import { Router } from "express";
import * as Middleware from "../middleware/Admin.js";
import * as Controller from "../controller/Admin.js"
import { tokenMiddleware } from "../middleware/tokeMiddleware.js";

const adminRoutes = Router();

adminRoutes.post("/sendMail",Middleware.sendmail);
adminRoutes.post("/signUp",Middleware.signup,Controller.signup);
adminRoutes.get("/login",Middleware.login,Controller.login);
adminRoutes.patch("/changePassword",tokenMiddleware("Admin"),Middleware.changePassword,Controller.changePass);
adminRoutes.patch("/forgotPassword",Middleware.forgotPassword,Controller.forgotPassword);
adminRoutes.delete("/delete",tokenMiddleware("Admin"),Controller.deleteAdmin);

export default adminRoutes;