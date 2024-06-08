import { transporter } from '@/utils/lib/nodemailer';
import { otpTemplate } from '@/utils/mailer/templates/otp';

export const sendOtp = async ({ name, email, otp }) => {
  try {
    const mail = await transporter.sendMail({
      from: 'Linktr3 Project <liby@codesync.ph>',
      to: email,
      subject: 'Verify your Linktr3 Account',
      text: `Hello ${email}, please verify your Linktr3 🌲 account`, 
      html: otpTemplate(otp, email, name)
    });
    console.log("OTP Sent:", mail.accepted);
    return mail;
  } catch (error) {
    console.log("Mail service error:", error.message);
    return null;
  }
}


// (async function() {
//   try {
//     const mail = await sendOtp({
//       email: 'janlibydelacosta@gmail.com', 
//       name: 'Liby', 
//       otp: '273549'
//     })
//     console.log(mail)
//   } catch (error) {
//     console.log(error)
//   }
// })();