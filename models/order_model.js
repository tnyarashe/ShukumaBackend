odule.exports = order;

const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    description:{
        type:String,
        required:true
    },

    total:{
        type:Number,
        required:true
    },

    user:{
        type:String,
        required: true

    },

    address:{
        street:{type:String},
        city:{type:String},
        postalcode:{type:String},
        country:{type:String},

    },
    
    items:{
        type:String,
        required:true
    },

    orderNumber:{
        type:Number,
        required:true
    },

    
},{
    timestamps:true
    
})
orderSchema.method('to JSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


const Order = mongoose.model('order', orderSchema)
module.exports = Order