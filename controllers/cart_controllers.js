const Cart = require('../models/cart_models')
const mongoose = require("mongoose")
const Product = require('../models/product_model');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const id = "66865064ad57296a97884bc3"
    
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).send({ message: "Invalid product ID or quantity" });
    }
    
    const cartId = req.params.id
    
    let cart = await Cart.findOne({ userId: id });
    // let cartid = bodycart

    if (!cart) {
      const newCart = new Cart({ userId: id });
      console.log(newCart)
      cart = await newCart.save();
      console.log(cart)
    }

    const product = await Product.findById(productId).populate();
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    
    const existingItem = cart.items.find(item => item.productId.equals(productId));
    
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      
      cart.items.push({ productId, quantity, price: product.price });

      
    }

    await cart.save();

    res.status(200).send({ message: "Item added to cart successfully!", items: cart.items});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding item to cart" });
  }
};

exports.getAllCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    if (!cart) {
      return res.status(404).json({ message: 'Carts could not be found' });
    }
    // const populatedCart = await Cart.populate(cart, { path: 'items.productId' });
    // console.log(populatedCart)
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId
    const productId = req.body.productId
    const cart = await Cart.findOne({userId: userId}).populate( { path: 'items.productId'});;
    // const cart = await Cart.findById(id);
    console.log(";;;",cart, userId, productId)
    

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

     cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);
    // cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
    console.log("ll",cart)

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getACart = async (req, res) => {
  try {
    userId = req.body
    const cart = await Cart.find(userId).populate( { path: 'items.productId'});;

    if (!cart) {
      return res.status(200).send({ message: "Cart not found" }); // Or send an empty cart object
    }

    if (cart.items) {
      // const populatedCart = await Cart.populate( { path: 'items.productId'});
      // console.log(populatedCart)
      const totalPrice = populatedCart.items.reduce((total, item) => {
      
        return total + (item.productId.price * item.quantity);
      }, 0);
      
      console.log(totalPrice)
      res.status(200).send({populatedCart, totalPrice});
    } else {
      res.status(200).send(cart); 
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving cart" });
  }
};
