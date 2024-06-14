const { getUserByUsernameOrEmail, verifyPassword } = require('../Persistence/signinPersistence');
const { generateToken } = require('../Services/token_generate');
const loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
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
        res.status(200).json({ message: 'Login successful', token });
        return {
            token,
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };

    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            res.status(401).json({ message: 'Invalid credentials' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

};

module.exports = {
    loginUser,
};