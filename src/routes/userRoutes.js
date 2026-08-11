const express = require('express');
const userController = require('../controllers/userController');
const {signupRules,loginRules}=require('../middlewares/userValidator')

const router=express.Router();


router.post('/register',signupRules,userController.register);
router.post('/login',loginRules,userController.login);


module.exports =router; 