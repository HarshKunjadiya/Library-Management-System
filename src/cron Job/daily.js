import { CronJob } from "cron";
import IssuedBookDetails from "../database/models/issuedBook.js";
import { sendReturnReminder } from "../../templates/remainder.js";
import Student from "../database/models/student.js";
import { overdueReturnReminder } from "../../templates/overdueRemainder.js";
import { sendEmail } from "../utility/transporter.js";
export const job = new CronJob(
  "* * 0 * * * ",
  async () => {
    console.log("Cron started!");
  
    const Books = await IssuedBookDetails.find({ status: { $in: ["Issued", "overdued"]}});
    for (const key of Books) {
      const user = await Student.findById(key.userId);
      const currentDate = new  Date().toISOString().split("T")[0];
      const returnDate = key.returnDate.toISOString().split("T")[0];
      if (currentDate == returnDate) {
        const template = sendReturnReminder(user.name, returnDate);
        console.log("mail send to ", user.email);
        
        const result = await sendEmail(
          user.email,
          "Remainder for sbumit book",
          template
        );
        console.log(result);
      } else if (currentDate > returnDate) {
        const template = overdueReturnReminder(user.name, returnDate);
        console.log("mail send to ", user.email);
        const result = await sendEmail(
          user.email,
          "date overdue remainder",
          template
        );
        console.log(result);
      }
    }
    console.log("Cron ended successfully!");
    
  },
  () => {
    console.log("notificaton send to students");
  },
  true,
  "Asia/Kolkata"
);
