const {body}= require('express-validator');
const User=require('../models/User');
const validate=require('../middlewares/validate');

const signupRules = [
    body('name').trim().notEmpty().withMessage('Username is required'),
    body('email')
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    // Custom Validation
    .custom(async(email)=>{
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error('Email already Registered');
        }

    }),
    
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long'),

    validate // Attach our reusable error handler at the end of the array


];

const loginRules =[
    body('email').trim().isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long'),

    validate // Attach our reusable error handler at the end of the array

];

module.exports={signupRules,loginRules}

/*

normalizeEmail() is a utility function used in programming (common in validators and sanitizers like express-validator) to clean and convert an email address into a standard, uniform format.
-> removes dots
-> Strips plus-addressing tags (e.g., john+newsletter@gmail.com becomes john@gmail.com
-> Lowecases
-> Trims spaces : Removes extra leading or trailing whitespace
*/
