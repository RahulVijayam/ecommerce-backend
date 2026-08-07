const User = require('../models/User')

const register = async (req,res)=>{

    return res.status(200).json({message:"User Registered Successfully"})
}



module.exports = {register}