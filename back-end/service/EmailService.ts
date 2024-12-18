import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: "cas.marien.zebe@gmail.com", 
        pass: "abms ddsz kpxc bxwx", 
    },
});

const sendReminderEmail = async (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendReminderEmail;