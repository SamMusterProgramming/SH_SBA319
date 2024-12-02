const express = require('express')
const postModel = require('../models/posts')
const {ObjectId} = require('mongodb')
const data = require('../utulities/data')


route = express.Router();

route.get('/seed',async(req,res)=>{
    postModel.collection.drop() // delete the collection document
    data.posts.forEach(async(post) => {
      await new postModel(post).save()
    })
    const posts = await postModel.find({}).limit(20)
    if(!posts) return res.json({error:"posts list is empty"})
    res.json(posts).status(200) 
})

route.route('/')
    .get(async(req,res)=> { // get all posts for all Posts
        const posts = await postModel.find({}).limit(20)
        if(!posts) return res.json({error:"posts list is empty"})
        res.json(posts).status(200)
    })
    .post(validatePostData,async(req,res)=>{ 
        const post = req.body
        const newPost = new postModel(post)
        if(! newPost) return res.json({error:"can't save Post"})
        await newPost.save() 
        res.json(newPost)  
    })
async function validatePostData(req,res,next) {
    if(!req.body.id || !req.body.user_id)
       return res.status(404).json({error:"invalid data"}) // we don't want to save post with an existing id
    const post = await postModel.findOne({id:req.body.id})
    if(post) return res.status(404).json({error:"invalid ID"})
    next()
}  

// access post by their _id , delete and update 
route.route('/post/:id')
     .get(validateMongoObjectId,async(req,res)=>{
       const _id = req.params.id;
       const post = await postModel.findById(_id)
       if(!post) return res.json({error:"posts does't exist"}).status(404)
       res.json(post).status(200)
     })
     .delete(validateMongoObjectId,async(req,res)=>{
        const _id = req.params.id;
        const post = await postModel.findByIdAndDelete(_id)
        if(!post) return res.json({error:"posts does't exist"}).status(404)
        res.json(post).status(200)
      })
     .patch(validateMongoObjectId,async(req,res)=>{ // we update the entire post , id, user_id ...
        if(!req.body.id || !req.body.user_id) return res.status(404).json({error:"invalid data"}) 
        if(await postModel.findOne({id:req.body.id,user_id:req.body.user_id}))
            return res.status(404).json({error:"can't update post with id and user_id that has been already in use"}) 
        const _id = req.params.id;
        const post = await postModel.findByIdAndDelete(_id, req.body)
     })
// middleware to validate mongo objectId _id
function validateMongoObjectId(req,res,next) {
    if (!ObjectId.isValid(req.params.id)) return res.status(404).json({Error:"error in request ID"});
    next()
    }    


module.exports = route; 