const mongoose = require('mongoose')
const validator = require('validator');

const postSchema = new mongoose.Schema({
     id :{
        type:Number,
        min: 0,
        require:true,
        unique: true
    },
     image_url:{
        type:String,
        required:true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }   
    },
     user_id: {
        type:Number,
        required: true
    },
     description :{
        type:String,
        required:false
    }
},
 { versionKey: false }
 )
postSchema.index({id:1});
postSchema.index({user_id:1});
postSchema.index({id:1,user_id:1});

let postModel = mongoose.model("posts",postSchema);

module.exports = postModel ;