const { getUserByUsernameOrEmail, verifyPassword } = require('../Persistence/signinPersistence');
const { generateToken } = require('../Services/token_generate'); // Update the path accordingly

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

        const token = generateToken(user);

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
    loginUser
};
