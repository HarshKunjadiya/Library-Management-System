export const sendStudentOtp = (otp) => {
    
    return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Library System</a>
    </div>
    <p style="font-size:1.1em">Hello Student,</p>
    <p>You are attempting to verify your library account. Use the OTP below to complete the verification process. The OTP is valid for 5 minutes.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Library System</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Library System</p>
      <p>123 Library Street</p>
      <p>Your City, Your Country</p>
    </div>
  </div>
</div>`
}
