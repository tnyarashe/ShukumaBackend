const { default: mongoose } = require("mongoose");
const Product = require('../models/product_model'); 
const { compareSync } = require("bcryptjs");

exports.getAllProducts = async (req, res)=>{
    try{
        productsAll = await Product.find()
        if(!productsAll){
            return res.status(400).send({message: "Failed to get all the prodcuts", productsAll})
        }

        res.status(200).send({message : "Managed to get all products", productsAll})
        
    }catch(err){
        res.status(500).send("Could not get all the products", err)
    }
}
exports.getOneProduct = async (req, res)=>{
    try{
        const {productId} = req.body

        console.log(productId)
        if(!productId){
            return res.status(400).send("Enter product ID") 
        }

        let product = await Product.findOne({productId})

        if(!product){
            return res.status(400).send({message: "Cannot get product with ID : ", productId}) 
        }

        res.status(200).send({message: "Got product by ID :", productId})


    }catch(err){
        res.status(500).send({message:"Could not get the product", err})
    }
}
// exports.updateOne = async (req, res)=>{
//     try{
//         const id = req.params.id

//         console.log(id)
//         if(!id){
//             return res.status(400).send("Enter product ID") 
//         }

//         let updateOneProduct  = await User.findByIdAndUpdate(id, req.body)


//         if(!updatedUser){
//             return res.status(404).send({message:"Cannot get user with email : ", email}) 
//         }
//         await updatedUser.save()

//         res.status(200).send({message: "Got user by email :", updatedUser})


//     }catch(err){
//         res.status(500).send({message:"Could not get the user", err})
//     }
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