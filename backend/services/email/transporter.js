const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  auth: {
      user:  process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
  }
});

module.exports = transporter;