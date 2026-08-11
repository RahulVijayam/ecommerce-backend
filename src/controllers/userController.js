const User = require('../models/User')
const bcrypt=require('bcryptjs')


const register = async (req,res)=>{

    const {name,email,password}=req.body;
    
    try{

        const hashPassword = await bcrypt.hash(password,10)
        const newUser = new User({name,email,password:hashPassword})
        await newUser.save()

        return res.status(201).json({message:"User Registered Successfully",user:newUser})

    }catch(err){

        res.status(500).json({message:"User Not Registered",error:err.message})
    }



   }

const login = async (req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email})
    if(!user) {return res.status(404).json({message:"User Not Found"})}

    const pass_check = await bcrypt.compare(password,user.password)
    if(!pass_check){return res.status(401).json({message:"Invalid Password"})}

    const userData ={"ID" :user.id,"Name":user.name,"Email":user.email}
    return res.status(200).json({message:"Login Successful",userData})
}


module.exports = {register,login}