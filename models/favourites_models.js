const mongoose = require('mongoose');

const FavoritesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


FavoritesSchema.method('toJSON' , function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const Favourites = mongoose.model('Favourites', FavoritesSchema)
module.exports = Favourites