export const sendReturnReminder = (studentName, dueDate) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Library Management System</a>
  </div>
  <p style="font-size:1.1em">Dear ${studentName},</p>
  <p>This is a friendly reminder that your borrowed book is due for return by <strong>${dueDate}</strong>. Please make sure to return it on time to avoid any late fees.</p>
  <p>If you have already returned the book, please disregard this message.</p>
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
