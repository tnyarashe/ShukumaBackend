const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        }

        // imageUrl: {
        //     type: String,
        //     required: true
        // }
})

productSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })

const Product = mongoose.model('product', productSchema)
module.exports = Product