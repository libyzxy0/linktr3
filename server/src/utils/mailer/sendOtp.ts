import { transporter } from '@/utils/lib/nodemailer';
import { otpTemplate } from '@/utils/mailer/templates/otp';

export const sendOtp = async ({ name, email, otp }) => {
  const mail = await transporter.sendMail({
    from: 'Linktr3 Project <liby@codesync.ph>',
    to: email,
    subject: 'Verify your otp',
    text: 'Hello janlibydelacosta@gmail.com verify your otp!', 
    html: otpTemplate(otp, email, name)
  });
  return mail;
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