const { validationResult } = require('express-validator');
// Reusable middleware that checks for validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({
        status: "Validation Failed",
        errors: errors.array().map(err =>({field: err.path, message: err.msg}))
    })
}

module.exports = validate;