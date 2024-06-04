const express = require('express')
const app  =  express()
const cors = require("cors")

const db = require('./config/db.config')
const mongoose = require('mongoose')
const userRoutes  = require('./routes/user.routes')
const authRoutes  = require('./routes/auth.routes')
const orderRoutes = require('./routes/orderRoutes')
const order = require('./middleware/order.middleware')

const path = require('path')
const dotenv = require('dotenv');
// const { default: cartRoutes } = require('./routes/cartRoutes')

// Set up Global configuration access
dotenv.config();

app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

mongoose.connect(process.env.db_uri)
    .then(()=>{
        console.log("Connected successfully to DB!")
    })
    .catch((error)=>{
        console.log("Could not connect to DB due some error:", error.stack),
        process.exit();
    })



app.use('/v1/users', userRoutes);
app.use('/v1/auth', authRoutes)
app.use('/v1/order',orderRoutes)


app.get('/', (req, res)=>{
    res.send("Welcome to our API");
})
app.get('/home', (req, res)=>{
    res.send("Hello World.")
})

//Render the signup page
app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname,'public','form.html'))
} )

//Render the login page

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname,'public','login.html'))
} )

// app.post('/order', order(order_model), (req,res) => {
//     res.status(200).send(req.body);
// });


app.listen(process.env.PORT, ()=>{
    console.log("Listening @ port:", process.env.PORT)
})
