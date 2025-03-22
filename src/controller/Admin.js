import Admin from "../database/models/admin.js";
import Otps from "../database/models/otp.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import 'dotenv/config';

export const signup = async (req, res) => {
    try {
      const { otp, email , password } = req.body;
      console.log(email);
      
      const checkUser = await Admin.findOne({ email });
      if (checkUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const userOtp = await Otps.findOne({ email });
      if ( !userOtp) { 
        return res.status(404).json({ message: "invalid detail" });
      }  
      if (!(Date.now() - userOtp.time < 600000)) {
        return res.status(404).json({ message: " OTP expired please resend OTP " });
      }  
      if (userOtp.otp !== otp) {
        return res.status(404).json({ message: "Invalid OTP" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Admin.create({ ...req.body , password : hashedPassword });
      return res.status(200).json({ message: " User signUp successfully ",reponse : user });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "internal server error" });
    }
  };


  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Admin.findOne({ email });
      if (!user) {
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
          role : "Admin"
        },
        process.env.JWT_ADMIN_SECRET
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
      const user = await Admin.findOne({ email });
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
      user.password = encryptPass;
      user.save();
      res.status(200).json({ message: " password change successfully" });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "internal server error " });
    }
  };


  export const forgotPassword = async (req, res, next) => {
    try {
      const { email, otp, password } = req.body;
      const userOtp = await Otps.findOne({ email });
      const user = await Admin.findOne({ email });
      if (Date.now() - userOtp.time > 600000) {
        return res.status(404).json({ message: " OTP expired please resend OTP " });
      }
      if (userOtp.Otp !== otp) {
        return res.status(404).json({ messsage: "Invalid OTP " });
      }  
      const verifyPass = await bcrypt.compare(password, user.password);
      if (verifyPass) {
        return res.status(404).json({ message: "password is same as previous password " });
      } 
      const encryptPass = bcrypt.hash(password,10);
      user.password = encryptPass;
      user.save();
      return res.status(200).json({messsage: "Password updated successfully ",response: user});
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "internal server error" });
    }
  };

  export const deleteAdmin = async (req,res) => {
    try {
      const {email} = req.user;
      const user = await Admin.findOne({email});
      if(!user){
        return res.status(404).json({message : "user not found"});
      }
      await Admin.deleteOne({email});
      return res.status(200).json({message : "user deleted succceffully "});
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "internal server error" });
    }
  };