const mongoose = require('mongoose');
// const User = require('./user_model');
const favouritesSchema = mongoose.Schema ({
    items :{
        type:String,
        required:true
    },

    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },

    createdAt :{
        type:String,
        required:true
    },

    updatedAt :{
        type:String,
        required:true
    }
})

favouritesSchema.method('to JSON' , function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const Favourites = mongoose.model('favourites', favouritesSchema)
module.exports = Favourites