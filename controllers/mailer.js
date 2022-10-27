const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.mailer = async  (recepientList, emailBody) => {
  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_USERNAME, // sender address
    to: [recepientList], // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailBody, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}