const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) define the mail options
  const mailOptions = {
    form: 'minh thuan Schmedtmann <admin@gmail.com>',
    subject: options.subject,
    to: options.email,
    text: options.message,
  };

  // 3) actually send the mail
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
