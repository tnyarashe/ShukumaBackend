const Product = require('../models/product_model'); 
const UploadImage = require('../middleware/images_controllers')
const  fileUpload = require('express-fileupload')
const express = require('express')
const app = express()

app.use(fileUpload());

exports.createProduct = async (req, res) => {
    // try {
    //   if (!req.body) {
    //     return res.status(400).send({ message: "Content can not be empty!" });
    //   }
  
    //   if (!req.files || !req.files.images) {
    //     return res.status(400).send({ message: "Please upload a product image" });
    //   }
  
    //   const filename = `${Date.now()}-${req.files.images.name}`;

    //   const imgUrl = await UploadImage.UploadImage(req.files.images, filename);
  
    //   if (!imgUrl) {
    //     return res.status(400).send({ message: "Failed to upload product image" });
    //   }
  
    //   const product = new Product({ ...req.body, imageUrl: imgUrl.Location });
  
    //   await product.save();

    // //   res.status(200).send({ message: "Product created successfully!", product });
    // // } catch (error) {
    // //   console.error(error);
    // //   res.status(400).send({ message: "Error creating product" }); 
    // // }
    try{
        const product = req.body;
        console.log(product)

        if (!req.files || !req.files.imgUrl) {
            return res.status(400).send('No file uploaded.');
          }

        const fileImage = req.files.imgUrl;
        const result = await UploadImage.UploadImage(fileImage);
            
        // const uploadResult = await UploadImage.UploadImage(files)
           console.log(result)
        const imageUrl = result.Location
 
        product.imageUrl = imageUrl
        const productData = new Product(product)
        await productData.save();

        res.status(200).json(product);
    }catch(error){
        res.status(400).json({message: error.message})
    }
        
    

  };

exports.getAllProducts = async (req, res)=>{
    try {
        const products = await Product.find()

        res.status(200).send({message: "Successfully retrieved all products!", products})

    } catch (error) {
        res.status(500).send({message: "Can't find products, some error occured", error})
    }
}

exports.getOneProduct = async (req, res)=>{
    try {
        const id = req.params.id

        if(!id){
            return res.status(400).send("Please enter proper product ID.")
        }

        const product = await Product.findById(id)

        res.status(200).send({message: "Product successfully retrieved ", product})

    }   catch (error) {
            res.status(500).send({message: "Can't find product, some error occured", error})
    }
}

exports.deleteProduct = async (req, res)=>{
    try{
        const id = req.params.id

        if(!id){
            return res.status(400).send("Please enter proper data.")
        }

        const product = await Product.findByIdAndDelete(id)

        res.status(200).send({message: "Product successfully deleted!", item: product })

    } catch (error) {
        res.status(500).send({message: "Can't find product, some error occured", error})
    }
}

exports.updateProduct = async (req, res)=>{
    try{

        const id = req.params.id

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
        
        if(!updatedProduct){
            return res.status(400).send("Please enter proper data")
        }

        await updatedProduct.save()

        res.status(200).send({message: "Product updated successfully ", updatedProduct})

    } catch(error){
        res.status(500).send({message:"Could not update product, some error occured", error})
    }
}

exports.deleteAllProducts = async (req, res)=>{
    try{
        const product = await Product.deleteMany()

        res.status(200).send({message: "Products successfully deleted!"})

    } catch (error) {
        res.status(500).send({message: "Cannot delete products, some error occured", error})
    }
}
