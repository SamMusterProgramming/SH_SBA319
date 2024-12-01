const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session');
const connectDB = require('./db.js')
require('dotenv').config()
const userModel = require('./models/users.js')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const PORT = process.env.PORT
const app = express()
connectDB()
app.use(cors())
app.use(urlencodedParser)
app.use('/static', express.static('public'))


app.get('/',(req,res)=>{
    res.send('welcome to our app') 
})

app.post('/',async(req,res)=> {
    try {
        const user = req.body
        const newUser = new userModel(user)
        if(! newUser) return res.json({error:"can,t save user"})
        newUser.save()
        res.json(newUser)   
    } catch (error) {
        console.log(error)
    }
})

  
app.listen(PORT,()=> {
    console.log("running on port" + PORT)
})