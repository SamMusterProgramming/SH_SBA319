const mongoose = require('mongoose')
const validator = require('validator');

const commentSchema = new mongoose.Schema({
     id :{
        type:Number,
        min: 0,
        require:true,
        unique: true
    },
     post_id: {
        type:Number,
        required: true
    },
     comments:{
        type:Array,
        required:false
    }
},
 { versionKey: false }
 )
commentSchema.index({id:1});
commentSchema.index({post_id:1});
commentSchema.index({id:1,post_id:1});

let commentModel = mongoose.model("comments",commentSchema);

module.exports = commentModel ;