import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokeMiddleware.js";
import * as controller from "../controller/book.js";
import * as middleware from "../middleware/book.js";

const bookRoutes = Router();
bookRoutes.get("/getBook",controller.getAllbook);
bookRoutes.post("/addBook",tokenMiddleware("Admin"),middleware.addBook,controller.addBook);
bookRoutes.post("/issueBook",tokenMiddleware("Admin"),middleware.issuedBook,controller.issuedBook);
bookRoutes.delete("/returnBook",tokenMiddleware("Admin"),middleware.returnBook,controller.returnBook);
bookRoutes.patch("/reissueBook",tokenMiddleware("Admin"),middleware.reIssueBook,controller.reIssueBook);
bookRoutes.delete("/removeBook",tokenMiddleware("Admin"),middleware.removeBook,controller.removeBook);

export default bookRoutes;