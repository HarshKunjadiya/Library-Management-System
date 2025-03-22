import Admin from "../database/models/admin.js";
import Student from "../database/models/student.js";


export const addBook = (req,res,next) =>{
    try {
        const {email,role} = req.user;
        if(role !== "Admin"){
            res.status(404).json({message : "user not have access to add book"});
        }
        const user = Admin.findOne({email});
        if(!user){
            res.status(404).json({message : "user not found"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({message : "internal server error"});
    }
}

export const issuedBook = (req,res,next) => {
    try {
        const {role} = req.user;
        const {userId} = req.body;
        if(role == "Student"){
            return res.status(404).json({message : "user don't have access to issue book"});
        }
        const students = Student.findById(userId);
        if (!students) {
            return res.status(404).json({message : "student not found"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({message : "internal server error"});
    }
}

export const returnBook = async(req,res,next) =>{
    try {
        const {role} = req.user;
        const {userId} = req.body;
        if(role == "Student"){
            return res.status(404).json({message : "user don't have access to issue book"});
        }
        const user = await Student.findById(userId);
        if(!user){
            return res.status(404).json({message : "student not found"});
        }
        console.log(user);
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({message : "internal server error"});
    }
}

export const reIssueBook = async(req,res,next) =>{
    try {
        const {role} = req.user;
        const {userId} = req.body;
        if(role == "Student"){
            return res.status(404).json({message : "user don't have access to issue book"});
        }
        const user = await Student.findById(userId);
        if(!user){
            return res.status(404).json({message : "student not found"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({message : "internal server error"});
    }
}

export const removeBook = async(req,res,next) =>{
    try {
        const {role,email} = req.user;
        if(role == "Student"){
            return res.status(404).json({message : "user don't have access to issue book"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({message : "internal server error"});
    }
}