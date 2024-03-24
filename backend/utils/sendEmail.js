const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
          
            service: 'gmail',
            auth: {
                user:EMAIL,
                pass: EMAIL_PASS,
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