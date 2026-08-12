const express = require('express');
const userController = require('../controllers/userController');
const {signupRules,loginRules}=require('../middlewares/userValidator')
const verifyToken = require('../middlewares/authMiddleware')

const router=express.Router();


router.post('/register',signupRules,userController.register);
router.post('/login',loginRules,userController.login);
router.get('/profile', verifyToken, userController.profile);


module.exports =router; 