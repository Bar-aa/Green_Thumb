
const bcrypt = require('bcryptjs');
const PersistenceEmail = require('../Persistence/EmailPresistance');
const nodemailer = require('nodemailer');

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
        const affectedRows = await PersistenceEmail .updateUserMessage(email, 'verified successfully');
        
        if (affectedRows === 0) {
            return res.status(404).send({ msg: 'Invalid verification token' });
        }

        res.status(200).send({ msg: 'Email verified successfully! You can now login.' });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { email, username } = req.body;

    if (!email) {
        return res.status(400).send({ msg: 'Email is missing' });
    }

    const newPassword = Math.floor(1000 + Math.random() * 9000).toString();

    try {
        const hash = await bcrypt.hash(newPassword, 10);
        const affectedRows = await PersistenceEmail.updateUserPassword(username, hash);

        if (affectedRows === 0) {
            return res.status(404).send({ msg: 'User not found' });
        }

        const mailOptions = {
            from: 's12028958@stu.najah.edu',
            to: email,
            subject: 'Your New Password',
            text: `Your new password is: ${newPassword}`
        };

        await sendEmail(mailOptions);

        return res.status(200).send({ msg: 'New password sent successfully' });
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
};

module.exports = {
    verifyEmail,
    resetPassword
};
