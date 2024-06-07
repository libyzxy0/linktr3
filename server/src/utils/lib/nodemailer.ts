import 'dotenv/config'
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST, 
  port: 465, 
  secure: true, 
  secureConnection: false,
  tls: {
   ciphers: "SSLv3",
  },
  requireTLS: true,
  debug: true,
  connectionTimeout: 10000,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }, 
});