
const Joi = require('joi');

const emailSchema = Joi.object({
    email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    newPassword: Joi.string().required(), // No length requirement
});

const validateEmail = (req, res, next) => {
    const { error } = emailSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ msg: error.details[0].message });
    }
    next();
};

const validateResetPassword = (req, res, next) => {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
        return res.status(400).send({ msg: error.details[0].message });
    }
    next();
};

module.exports = {
    validateResetPassword,
    validateEmail
};
