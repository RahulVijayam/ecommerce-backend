const mongoose = require('mongoose');

//Schema defines the structure and validation rules of a document
const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        requried:true,
        tirm:true //It will remove the white space from the name
    },
    email:{
        type:String,
        required:true,  
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
        
    },
    role:{
        type:String,
        enum:['user','admin'], // Only these values are allowed
        default:'user'

    }
});


//Model is a compiled wrapper of the schema that provides the interface to query and manipulate data in the database
//Think of a Schema as the architectural blueprint, and a Model as the actual building contractor


const User = mongoose.model('User',userSchema)

module.exports = User;



