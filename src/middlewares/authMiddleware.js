/*Extract token → verify token → identify user → allow request*/
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const secretKey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    try {
        //Get Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Access Denied!,Authorization header missing" })
        }

        // Expected format: // Authorization: Bearer <token>
        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({ error: "Invalid Authorization format" })
        }

        // Verify the token
        const decoded = jwt.verify(token, secretKey); // this will deco de our token which consists of {UserId:user._id}
      
    
        req.user = decoded;  //Store decoded information in request

        // 5. Continue to controller
        next();
    }
    catch (error) {
        console.log(error.message)
          return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = verifyToken;