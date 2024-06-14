
const bcrypt = require('bcryptjs');
const PersistenceEmail = require('../Persistence/EmailPresistance');
const nodemailer = require('nodemailer');
const db = require('../config/dbconnection');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 's12028958@stu.najah.edu',
        pass: 'nbgo afpl muuy jali'
    }
});

const sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const verifyEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ msg: 'Email is missing' });
    }

    try {
        const affectedRows = await PersistenceEmail.updateUserMessage(email, 'verified successfully');

        if (affectedRows === 0) {
            return res.status(404).send({ msg: 'Invalid verification token' });
        }

        res.status(200).send({ msg: 'Email verified successfully! ' });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};

const resetPassword = async (req, res) => {
    const email = req.user.email;
    const username = req.user.username;
    const newPassword = req.body.newPassword;
    if (!email || !newPassword) {
        return res.status(400).send({ msg: 'Email or new password is missing' });
    }

    try {

        const hash = await bcrypt.hash(newPassword, 10);
        const affectedRows = await PersistenceEmail.updateUserPassword(username, hash);
        if (affectedRows === 0) {
            return res.status(404).send({ msg: 'User not found' });
        }

        // Send email with the new password
        const mailOptions = {
            from: 's12028958@stu.najah.edu',
            to: email,
            subject: 'Your New Password',
            //text: `Hi: ${username} Welcome, we are honored to have you. I hope you benefit from this site`,
            text: `Welcome, ${username} we are honored to have you I hope you benefit from this site The password for the website Green_Thumb has been changed 
            (The new password is: ${newPassword})`
        };
        await sendEmail(mailOptions);
        return res.status(200).send({ msg: 'New password sent successfully' });
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
};

module.exports = {
    verifyEmail,
    resetPassword,



};
