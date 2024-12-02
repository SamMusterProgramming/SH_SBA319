const express = require('express')
const userModel = require('../models/users')
const postModel = require('../models/posts')
const session = require('express-session')

route = express.Router();

route.use(session({
    secret: 'keyboard cat',
    resave: false ,
    saveUninitialized: true
})) 

route.route('/')
   .get(async(req,res)=>{ // get all users
     const users = await userModel.find({}).limit(20)
     if(!users) return res.json({error:"users list is empty"})
     res.json(users).status(200)   
   })
   .post(validateUserRegistration,async(req,res)=> {  // add or register user
      const user = req.body
      const newUser = new userModel(user)
      if(! newUser) return res.json({error:"can't save user"})
      await newUser.save()
      res.json(newUser)   
   })   
async function validateUserRegistration(req,res,next) {
    if(!req.body.email || !req.body.password || !req.body.username)
       return res.status(404).json({error:"invalid entry"}) //redirect('/registration')
    const query = {email:req.body.email}
    const user = await userModel.findOne(query)
    if(user) return res.status(404).json({error:"email already exist"})
    next()
}

//I use this route to log in a user with session if successfully Authenticated 
route.get('/login', isAuthenticated, async (req, res) => {
    if(!req.session.user) res.status(400).json("not looged in n")
    res.status(200).json("successfully logged in ")
})

route.post('/login', async(req, res)=>{
    console.log(req.body)  
    if(!req.body.email || !req.body.password) return res.json({error:"invalid loggin "}).status(404)
    const query = {email:req.body.email,password:req.body.password}
    const user = await userModel.findOne(query)
    console.log(user)
    if(!user) return res.json({error:"user not found "}).status(404)
    req.session.regenerate(function (err) {
        if (err) return res.send('errrooorr')
        req.session.user = user
        req.session.save(function (err) {
           if (err) return res.send('errrooorr')
           res.redirect('/users/login')
      })
    })
})

//log out a user and reset session to null
route.get('/logout',async(req,res)=>{
    req.session.user = null
    req.session.save(function (err) {
      if (err) return err
      req.session.regenerate(function (err) {
        if (err) return err
        return res.redirect('/')  
      })
    })
})

// middleware to test if authenticated
function isAuthenticated (req, res, next) {
    if (req.session.user) next()
    else res.redirect('/')
}

//***********************************************POSTS********************************** */


route.route('/posts')
     .get(async(req,res)=>{
       const posts = await post
     })
     .post(validatePost,async(req,res)=>{
      console.log(req.body)
       const post = req.body
       const newPost = new postModel(post)
       await newPost.save()
       return res.json(newPost).status(201)
     })
function validatePost(req,res,next) {
      if(!req.body.id || !req.body.user_id || !req.body.image_url)
         return res.status(404).json({error:"invalid entry"}) 
      next()
  }

module.exports = route; 