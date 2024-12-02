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




module.exports = route; 