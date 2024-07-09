const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required:true
        },

        variant : {
            type: String,
            default: "normal"
        },

        category: {
            type: [String],
            required : true
        },

        // rating: {
        //     type: Number,
        //     default: 0,
        //     min: 0,
        //     max: 5
        // },
        // // ratingCount: {
        // //     type: Number,
        // //     default: 0 
        //   },
        imageUrl: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: [true, "Please enter a valid stock quantity"],
            min: 0
        },
        // onPromo: {
        //     type: Boolean,
        //     default: false
        // },
        businessId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business',
        }
}, {
    timestamps: true 
  });
  

productSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })

const Product = mongoose.model('Product', productSchema)
module.exports = Product