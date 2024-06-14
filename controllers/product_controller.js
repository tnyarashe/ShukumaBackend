const Product = require('../models/product_model'); 

exports.createProduct = async (req, res)=>{
    try {
        
        const product = await Product(req.body)

        if(!product){
           return  res.status(400).send({message: "Please enter proper data"})
        }

        await product.save()

        res.status(200).send({message: "Product created successfully!", product})

    } catch (error) {
        res.status(500).send({message: "Can't create product, some error occured", error})
    }
}

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
        const {id} = req.params.id

        if(!{id}){
            return res.status(400).send("Please enter proper product ID.")
        }

        const product = await Product.findOne(id)

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

        res.status(200).send({message: "Product successfully deleted!"})

    } catch (error) {
        res.status(500).send({message: "Can't find product, some error occured", error})
    }
}

exports.updateProduct = async (req, res)=>{
    try{

        const id = req.params.id

        const updatedProduct = await Product.findByIdAndUpdate(id,req.body);
        
        if(!updatedProduct){
            return res.status(400).send("Please enter proper data")
        }

        await updatedProduct.save()

        res.status(200).send({message: "Product updated successfully ", updatedProduct})

    } catch(error){
        res.status(500).send({message:"Could not update product, some error occured", error})
    }
}

// exports.deleteAllProducts = async (req, res)=>{

// }

// exports.allAccess = (req, res) => {
//     res.status(200).send("Public Content.");
// };
  
// exports.user_dBoard = (req, res) => {
//     res.status(200).send("User Content.");
// };
  
// exports.admin_dBoard = (req, res) => {
//     res.status(200).send("Admin Content.");
// };
  
// exports.moderatorBoard = (req, res) => {
//     res.status(200).send("Moderator Content.");
// };