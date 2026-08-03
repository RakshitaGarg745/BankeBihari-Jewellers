const axios = require("axios");

exports.sendEmail = async ({ to, subject, html }) => {

    return axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
            sender: {
                name: "BankeBihari Jewellers",
                email: "bankebiharijewellers26@gmail.com"
            },
            to: [
                {
                    email: to
                }
            ],
            subject,
            htmlContent: html
        },
        {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json"
            }
        }
    );

};