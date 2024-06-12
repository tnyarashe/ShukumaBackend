const Product = require('../models/product_model'); 

exports.createProduct = async (req, res)=>{
    try {
        
        const product = await Product(req.body)

        if(!product){
           return  res.status(400).send({message: "Failed to create product"})
        }
        await product.save()

        console.log(product)

        res.status(200).send({message: "Successfully retrieved all products!", product})
    } catch (error) {
        res.status(500).send({message: "Cant find products, some error occured", err})
    }
}

exports.getAllProducts = async (req, res)=>{
    try {
        const products = await Product.find()

        if(!products){
           return  res.status(400).send({message: "Failed to get products"})
        }

        console.log(products)

        res.status(200).send({message: "Successfully retrieved all products!", products})
    } catch (error) {
        res.status(500).send({message: "Cant find products, some error occured", err})
    }
}

exports.getOneProduct = async (req, res)=>{
    try {

        const {id} = req.body

        const product = await Product.findOne(id)

        if(!product){
           return  res.status(400).send({message: "Failed to find product"})
        }
        console.log(product)
        
        res.status(200).send({message: "Successfully retrieved ", product})

    } catch (error) {
        res.status(500).send({message: "Cant find product, some error occured", err})
    }
} 
// exports.updateOneProduct = async (req, res)=>{
//     try{
//         const id = req.params.id

//         console.log(id)
//         if(!id){
//             return res.status(400).send("Enter product ID") 
//         }

//         let updatedProduct  = await Product.findByIdAndUpdate(id, req.body)

//         if(!updatedProduct){
//             return res.status(404).send({message:"Cannot get product with ID : ", productId}) 
//         }
//         await updatedProduct.save()

//         res.status(200).send({message: "Got product by ID: ", updatedProduct})

//     }catch(err){
//         res.status(500).send({message:"Could not get the product", err})
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