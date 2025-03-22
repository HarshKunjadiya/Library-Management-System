export const overdueReturnReminder = (studentName, dueDate) => {
    return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #d9534f;text-decoration:none;font-weight:600">Library Management System</a>
    </div>
    <p style="font-size:1.1em">Dear ${studentName},</p>
    <p>We hope you are doing well. This is a reminder that the book you borrowed was due on <strong>${dueDate}</strong>. 
    However, our records show that it has not been returned yet.</p>
    <p>Please return the book as soon as possible to avoid any late fees or penalties.</p>
    <h3 style="background: #d9534f;margin: 0 auto;width: max-content;padding: 10px;color: #fff;border-radius: 4px;">
      Return Immediately
    </h3>
    <p style="font-size:0.9em;">Regards,<br />Library Management Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Library Management System</p>
      <p>123 Library Street</p>
      <p>Your City, Your Country</p>
    </div>
  </div>
</div>`;
};
