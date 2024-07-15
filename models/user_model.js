const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
  fname:{
    type: String,
    trim: true,
    minlength: 3, 
    maxlength: 20, 
  },
  lname:{
    type: String,
    trim: true,
    minlength: 3, 
    maxlength: 20, 
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3, // Minimum username length for better security
    maxlength: 20, // Reasonable maximum username length,
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length for better security
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },
  address: {
    type: String  
  },
  contact_no: {
    type: String
  },
  img: {
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    default: null
  },


}, {
  timestamps: true 
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Adjust salt rounds as needed
  }
  next();
});


userSchema.method('toJSON', function () {
  const { __v, password, ...object } = this.toObject();
  object.id = this._id.toString();
  return object;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
