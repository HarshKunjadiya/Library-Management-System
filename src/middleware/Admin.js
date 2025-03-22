import Otps from "../database/models/otp.js";
import {generateOTP,validateEmail,validatePassword,} from "../utility/authenticate.js";
import { sendEmail } from "../utility/transporter.js";
import "dotenv/config";
import { verifyOtpLibraryAdmin } from "../../templates/AdminOtp.js";
import Admin from "../database/models/admin.js";


export const sendmail = async (req, res) => {
  try {
    const { email } = req.body;
    const verifyEmail = validateEmail(email);
    if (!verifyEmail) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const otp = generateOTP();
    const template = verifyOtpLibraryAdmin(otp);
    const result = await sendEmail(email, "OTP verification", template);
    console.log(result);
    const time = Date.now();
    const user = await Otps.findOne({ email });
    if (user) {
      const time = Date.now();
      const user = await Otps.findOneAndUpdate({ email }, { otp, time});
      return res.status(200).json({ message: "OTP resend successfully", response: user });
    } else {
      const user = await Otps.create({ email, otp, time, role: "Admin" });
      return res.status(200).json({ message: "OTP sent successfully", response: user });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "internal server error" });
  }
};


export const signup = (req, res, next) => {
  try {
    const { name, email, password,otp} = req.body;
    if (!(name || email || password || otp )) {
      return res.status(400).json({ message: "Please enter all details" });
    }
    const verifyEmail = Otps.findOne({ email });
    if (!verifyEmail) {
      return res.status(400).json({ message: "invalid email" });
    }
    const verifyPass = validatePassword(password);
    if (!verifyPass) {
      return res.status(400).json({ message: "Invalid password" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "internal server error " });
  }
};


export const login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const verifyEmail = Otps.findOne({ email });
    if (!verifyEmail) {
      return res.status(400).json({ message: "invalid email" });
    }
    const verifyPass = validatePassword(password);
    if (!verifyPass) {
      return res.status(400).json({ message: "Invalid password" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "internal server error " });
  }
};  

export const changePassword = (req, res, next) => {
  try {
    const { newPass } = req.body;
    const verifyPass = validatePassword(newPass);
    if (!verifyPass) {
      return res.status(400).json({ message: "Invalid password" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "internal server error" });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    const verifyPass = validatePassword(password);
    if (!verifyPass) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (!email || !otp || !password) {
      return res.status(404).json({ messsage: "please enter all details " });
    } else {
      const userOtp = await Otps.findOne({ email });
      const user = await Admin.findOne({ email });
      if (!(userOtp || user)) {
        return res.status(404).json({ messsage: "Admin not found " });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "internal server error" });
  }
};
