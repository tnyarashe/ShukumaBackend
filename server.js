const express = require('express')
const app  =  express()
const cors = require("cors")
const fileUpload = require('express-fileupload')
const db = require('./config/db.config')
const mongoose = require('mongoose')
const businessRoutes  = require('./routes/business.routes')
const userRoutes  = require('./routes/user.routes')
const authRoutes  = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const orderRoutes = require('./routes/order.routes')
const favsRoutes = require('./routes/favorites.routes')
const cartRoutes  = require('./routes/cart.routes')
const path = require('path')
const dotenv = require('dotenv')
const multer = require('multer')
const AWS = require('aws-sdk');
// Set up Global configuration access
dotenv.config()

app.use(cors())

const allowedOrigin = "https://shukuma-client.vercel.app/welcome; http://localhost:4200";

app.use((req, res, next) => {
  if (req.origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use(fileUpload());


app.use(express.urlencoded({extended: true}))
app.use(express.json())




mongoose.connect(process.env.db_uri)
    .then(()=>{
        console.log("Connected successfully to DB!")
    })
    .catch((error)=>{
        console.log("Could not connect to DB due some error:", error.stack),
        process.exit();
    })

app.use('/v1/users', userRoutes)
app.use('/v1/auth', authRoutes)
app.use('/v1/products', productRoutes)
app.use('/v1/business', businessRoutes)
app.use('/v1/orders', orderRoutes)
app.use('/v1/cart', cartRoutes)
app.use('/v1/favourites', favsRoutes)


app.get('/', (req, res)=>{
    res.send("Welcome to our API");
})


app.listen(process.env.PORT, ()=>{
    console.log("Listening @ port:", process.env.PORT)
})