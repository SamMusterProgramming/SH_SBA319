const express = require('express')
const userModel = require('../models/users')
const session = require('express-session')

route = express.Router();

route.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })) 

route.route('/')
   .get(async(req,res)=>{ // get all users
     const users = await userModel.find({}).limit(20)
     if(!users) return res.json({error:"users list is empty"})
     res.json(users)
   })
   .post(async(req,res)=> {  // add or register user
      const user = req.body
      const newUser = new userModel(user)
      if(! newUser) return res.json({error:"can't save user"})
      await newUser.save()
      res.json(newUser)   
   })   


//I use this route to log in a user with session if successfully Authenticated 
route.get('/login', isAuthenticated, async (req, res) => {
    if(!req.session.user) res.status(400).json("not looged in n")
    res.status(200).json("successfully logged in")
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


module.exports = route;