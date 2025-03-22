import jwt from "jsonwebtoken";
import "dotenv/config";

export const tokenMiddleware = (role) => (req, res, next) => {
  const token = req.headers.authorization;
  const secret =
    role == "Admin"
      ? process.env.JWT_ADMIN_SECRET
      : process.env.JWT_STUDENT_SECRET;
  try {
    if (!token) {
        return res.status(404).json({msaage : "unauthorized"});
    }
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Invalid token!" });
  }
};

