const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
        user: 'noreply@the1bm.com',
        pass: 'the1bm$!'
    }
});

function sendEmail(userEmail, subject, htmlContent, callback) {
    const mailOptions = {
        from: 'noreply@the1bm.com',
        to: userEmail,
        subject: subject,
        html: htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return callback(`Error sending email: ${error}`);
        } else {
            console.log('Email sent:', info.response);
            return callback(null, `Email sent: ${info.response}`);
        }
    });
}

module.exports = {
    sendEmail
};
