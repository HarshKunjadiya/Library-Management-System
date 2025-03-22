import Otps from "../database/models/otp.js";
import Student from "../database/models/student.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const signup = async (req, res) => {
  try {
    const { otp, email,password } = req.body;
    const checkUser = await Student.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const userOtp = await Otps.findOne({ email });
    if (!userOtp) {
      return res.status(404).json({ message: "invalid detail" });
    }   
    if (!(Date.now() - userOtp.time < 600000)) {
      return res.status(404).json({ message: " OTP expired please resend OTP " });
    }  
    if (userOtp.otp !== otp) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await Student.create({ ...req.body , password : hashedPassword });
    return res.status(200).json({ message: " User signUp successfully " ,user});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });
    if (!(user)) {
      return res.status(404).json({ message: "please enter valid details" });
    }  
    const verifyPass = await bcrypt.compare(password, user.password);
    if (!verifyPass) {
      return res.status(404).json({ message: "incorrect email Or password" });
    }  
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        stream: user.stream,
        div: user.div,
        role : "Student"
      },
      process.env.JWT_STUDENT_SECRET
    );
    return res.status(200).json({ message: "login successfully", response: token });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "internal server error" });
  }
};

export const changePass = async (req, res) => {
  try {
    const { currentPass, newPass, confirmPass } = req.body;
    const { email } = req.user;
    const user = await Student.findOne({ email });
    console.log(user,newPass);
    const verifyNewPass = await bcrypt.compare(newPass,user.password);
    if (verifyNewPass) {
      return res.status(404).json({ message: "password is similar to previous password" });
    }
    const verifyPass = await bcrypt.compare(currentPass , user.password);
     if (!verifyPass) {
      return res.status(404).json({ message: " invalid password " });
    }      
    if (newPass !== confirmPass) {
      return res.status(404).json({ message: "password not matched" });
    }
    const encryptPass = await bcrypt.hash(confirmPass,10);
    user.password=encryptPass;
    user.save();  
    res.status(200).json({ message: " password change successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "internal server error " });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    console.log(email);
    
    const userOtp = await Otps.findOne({ email });
    const user = await Student.findOne({ email });
    console.log(user);
    
    if (Date.now() - userOtp.time > 600000) {
      return res.status(404).json({ message: " OTP expired please resend OTP " });
    } 
    if (userOtp.Otp !== otp) {
      return res.status(404).json({ messsage: "Invalid OTP " });
    }  
    const verifyPass = await  bcrypt.compare(password, user.password);
    if (verifyPass) {
      return res.status(404).json({ message: "password is same as previous password " });
    }
    const encryptPass = await bcrypt.hash(password,10
     );
    user.password=encryptPass;
    user.save();  
    return res.status(200).json({messsage: "Password updated successfully "});  
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "internal server error" });
  }
};

export const deleteStudent = async (req,res) => {
  try {
    const {email} = req.user;
      const user = await Student.findOne({email});
      if(!user){
        return res.status(404).json({message : "user not found"});
      }
      await Student.deleteOne({email});
      return res.status(200).json({message : "user deleted succceffully "});
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "internal server error" });
  }
};
