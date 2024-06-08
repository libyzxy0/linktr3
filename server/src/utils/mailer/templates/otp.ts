export function otpTemplate(otp, email, name) {
  return (
    `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="https://linktr3.vercel.app" style="font-size:1.4em;text-decoration:none;font-weight:600;color: #38bdf8;"><b className="color: #38bdf8;">Link<span style="color: #374151;">tr3🌲</span></b> 🇵🇭</a>
    </div>
    <p style="font-size:1.1em">Hi, ${name}</p>
    <p style="color: #374151;">Thank you for choosing Linktr3. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #38bdf8;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />
    <a href="https://linktr3.vercel.app" style="font-size:1em;text-decoration:none;font-weight:600;color: #38bdf8;"><b className="color: #38bdf8;">Link<span style="color: #374151;">tr3🌲</span></b></a>
    </p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <a style="color: #38bdf8;" href="https://www.libyzxy0.com">Made with 📱 by libyzxy0</a>
      <p>🇵🇭 Philippines</p>
    </div>
  </div>
</div>
`
 )
}