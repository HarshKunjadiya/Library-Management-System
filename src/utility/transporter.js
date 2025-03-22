import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = (to, subject, html) => {
  const info = transporter.sendMail({
    from : "<kunjadiyaharsh123@gmail.com>",
    to : to,
    subject : subject,
    html : html,
  });
  return info;
  
};