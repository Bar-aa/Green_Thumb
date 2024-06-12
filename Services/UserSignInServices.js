const jwt = require('jsonwebtoken');

const { getUserByUsernameOrEmail, verifyPassword } = require('../Persistence/signinPersistence');

const loginUser = async (usernameOrEmail, password) => {
    try {
        const user = await getUserByUsernameOrEmail(usernameOrEmail);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await verifyPassword(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign({
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }, 'your_secret_key_here', { expiresIn: '1h' }); // Adjust expiration time as needed

        // Return token along with user information
        return {
            token,
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    loginUser,
};
