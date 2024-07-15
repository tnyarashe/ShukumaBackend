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


  
  const UploadImage = async (fileImage) => {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION
    });
  
    const s3 = new AWS.S3();
    const fileContent = Buffer.from(fileImage.data, "binary");
  
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileImage.name,
      Body: fileContent
    };
  
    return await s3.upload(params).promise();
  };
  
  app.post('/upload', async (req, res) => {
    try {
      if (!req.files || !req.files.imgUrl) {
        return res.status(400).send('No file uploaded.');
      }
  
      const fileImage = req.files.imgUrl;
      const result = await UploadImage(fileImage);
  
      res.status(200).send({
        data: {
          message: 'File uploaded successfully to S3',
          s3Data: result
        }
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file.');
    }
  });
app.listen(process.env.PORT, ()=>{
    console.log("Listening @ port:", process.env.PORT)
})