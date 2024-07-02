const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        postalCode: { type: String }
  },
  
  isDriver: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  isBusinessName: { type: String, default: false},
  vehicleType: { type: String },
  vehiclePlateNumber: { type: String },
  active: { type: Boolean, default: false },
  currentLocation: {
    latitude: { type: Number },
    longitude: { type: Number }
  },

}, {
    timestamps: true 
})

userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })

const User = mongoose.model('user', userSchema);
module.exports = User