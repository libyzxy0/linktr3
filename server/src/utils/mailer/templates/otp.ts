export function otpTemplate(otp, email, name) {
  return (
    `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #374151;text-decoration:none;font-weight:600"><b className="color: #38bdf8;">Link</b>tr3🌲</a>
    </div>
    <p style="font-size:1.1em">Hi, ${name}</p>
    <p style="color: #374151;">Thank you for choosing Linktr3. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #38bdf8;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Linktr3</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Linktr3 by libyzxy0</p>
      <p>Sjdm Philippines</p>
      <p>Philippines</p>
    </div>
  </div>
</div>
`
 )
}