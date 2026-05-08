const emailService = require('../services/emailService');


const sendEmail = async (req, res) => {
    try {

        await emailService.sendEmail(
            "user@email.com",
            "Welcome to GuardianLink",
            "<h1>Welcome!</h1>"
        );

        res.status(200).json({
            message: "Email sent successfully",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to send email",
        });        
    }
};

module.exports = { sendEmail };