const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or the email service you're using
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('Error configuring transporter:', error);
  } else {
    console.log('Transporter is ready to send emails');
  }
});

module.exports = transporter;
