const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()
const secretKey=process.env.JWT_SECRET;

const register = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashPassword })
        await newUser.save()

        return res.status(201).json({ message: "User Registered Successfully", user: newUser })

    } catch (err) {

        res.status(500).json({ message: "User Not Registered", error: err.message })
    }



}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) { return res.status(404).json({ message: "User Not Found" }) }

    const pass_check = await bcrypt.compare(password, user.password)
    if (!pass_check) { return res.status(401).json({ message: "Invalid Password" }) }

  
    
    const token = jwt.sign(
        {userId: user._id},secretKey,{expiresIn: '1h'}
    ) 

    return res.status(200).json({message: "Login Successful", "token":token })
}

const profile = async (req, res) => {
     return res.status(200).json({
        message: "Protected route accessed successfully",
        userId: req.user.userId
    });

}


const createproduct = async (req, res) => {
     return res.status(200).json({
        message: "Protected route accessed successfully",
        userId: req.user.userId
    });

}

module.exports = { register, login,profile, createproduct }