const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session');
const connectDB = require('./db.js')
require('dotenv').config()
const userModel = require('./models/users.js')
const userRoute = require('./routes/userRoute.js')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const PORT = process.env.PORT
const app = express()
connectDB() 

app.use(cors())
app.use(urlencodedParser)
app.use('/static', express.static('public'))
app.use(express.json())
app.use('/users',userRoute)
app.use(validateRequestNetwork)


app.get('/',(req,res)=>{
     res.json('welcome to our app')
})    
    
function validateRequestNetwork(req,res,next) {
    try {  
        next()
    } catch (error) {
        console.log(error)
    }
}
    

app.listen(PORT,()=> {
    console.log("running on port" + PORT)
})