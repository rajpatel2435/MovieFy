const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user:"healthify.concordia@gmail.com",
                pass: "group134321",
            },
        });

        await transporter.sendMail({
            from: "healthify.concordia@gmail.com",
            to: email,
            subject: "Password Reset",
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;