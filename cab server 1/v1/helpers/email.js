const nodemailer = require("nodemailer");

const sendEmail = (to, from, subject, textBody, htmlBody, callback) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "patilaishu2020@gmail.com",
      pass: "Bhairavi2099",
    },
  });

  const mailOptions = {
    from: `"Topper Skills" <${from}>`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: textBody, // plain text body
    html: htmlBody, // html body
  };
  transport.sendMail(mailOptions, callback);
};

module.exports = sendEmail;
