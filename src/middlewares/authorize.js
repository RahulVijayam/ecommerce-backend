const User = require('../models/User')


const verifyRole = async(req,res,next) => {
    userId = req.user.userId

    try {
    const user = await User.findOne({userId})

    if(user.role=='admin'){
        next()
    }
}
catch(error){
    return res.status(401).json({message:"Unauthorized Access"})

}
    

}


module.exports=verifyRole