const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
     id :{
        type:Number,
        min: 0,
        require:true,
        unique: true
   },
     email:{
        type:String,
        required:true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }   
    },
     password: {
        type: String,
        required: true
      },
     username :{
        type:String,
        required:true,
  }
},
 { versionKey: false }
 )
userSchema.index({id:1});
userSchema.index({email:1});
userSchema.index({password:1})
userSchema.index({email:1,password:1});

let userModel = mongoose.model("users",userSchema);

module.exports = userModel ;