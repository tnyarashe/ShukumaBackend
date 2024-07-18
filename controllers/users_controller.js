const { default: mongoose } = require("mongoose");
const User = require('../models/user_model'); 
const { compareSync } = require("bcryptjs");
const UploadImage = require('../middleware/images_controllers')



exports.getAllUsers = async (req, res)=>{
    try{
        usersAll = await User.find()
        if(!usersAll){
            return res.status(400).send({message: "Failed to get all the users", usersAll})
        }

        res.status(200).send({message : "Managed to get all users", usersAll})
        
    }catch(err){
        res.status(500).send({message:"Could not get all the users", err})
    }
}

exports.getOne = async (req, res)=>{
    try{
        const id = req.params.id

        console.log(id)

        if(!id){
            return res.status(400).send("Enter email") 
        }

        const user  = await User.findById(id.toString())

        if(!user){
            return res.status(400).send({message: "Cannot get user with email : ", id}) 
        }
        
        res.status(200).json({message: "Got user by email :", user})

    } catch(err){
         res.status(500).send({message: "Could not get the user", err})
    }
}

exports.updateOne = async (req, res)=>{
    try{
        const _id = req.params.id
        const user = req.body
        console.log(_id, req.body, req.files)

        if(!id){
            return res.status(400).send("Enter email") 
        }
        if (!req.files || !req.files.imgUrl) {
            return res.status(400).send('No file uploaded.');
          }
        
        const fileImage = req.files.imgUrl;
        const result = await UploadImage.UploadImage(fileImage);
        
        user.img = result.Location
        const updatedUser  = await User.findByIdAndUpdate(_id.toString(), user)

        if(!updatedUser){
            return res.status(404).send({message:"Cannot get user with email : ", email}) 
        }
        
        await updatedUser.save()

        res.status(200).send({message: "User updated successfully:", updatedUser})

    }catch(err){
        res.status(500).send({message: "Could not update user, some error occuredr", err})
    }
}

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
}

exports.user_dBoard = (req, res) => {
    res.status(200).send("User Content.");
}
  
exports.admin_dBoard = (req, res) => {
    res.status(200).send("Admin Content.");
}

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
}