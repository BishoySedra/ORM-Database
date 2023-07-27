import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: 'bishosedra0@gmail.com',
        pass: 'bishoy@123'
    }
});

async function sendEmail(receiverEmail, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: 'bishosedra0@gmail.com', // sender address
            to: receiverEmail, // list of receivers
            subject, text, html
        });
    } catch (error) {
        console.log(error);
    }
};

export default sendEmail;