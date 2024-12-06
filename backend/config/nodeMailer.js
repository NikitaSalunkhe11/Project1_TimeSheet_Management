const nodemailer = require("nodemailer");

const addEmployeeTransporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:process.env.ADD_EMP_EMAIL,
      pass: process.env.ADD_EMP_PASSWORD,
    }
});

module.exports = addEmployeeTransporter;
