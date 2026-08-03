const nodemailer = require("nodemailer");

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("SMTP HOST = smtp-relay.brevo.com");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP VERIFY ERROR:", error);
    } else {
        console.log("SMTP READY");
    }
});

module.exports = transporter;