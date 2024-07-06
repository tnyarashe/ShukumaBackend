const Cart = require('../models/cart_models')

const Product = require('../models/product_model');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).send({ message: "Invalid product ID or quantity" });
    }
    const id = "66865064ad57296a97884bc3"
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
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => !item.productId.equals(req.params.productId));
    cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

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
    // Find the user's cart based on their ID (replace with your logic)
    id = req.params.userId
    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res.status(200).send({ message: "Cart not found" }); // Or send an empty cart object
    }

    // Populate product details for each item in the cart (optional)
    if (cart.items.length > 0) {
      const populatedCart = await Cart.populate(cart, { path: 'items.productId'});
      const totalPrice = populatedCart.items.reduce((total, item) => {
        return total + (item.productId.price * item.quantity);
      }, 0);
      res.status(200).send({populatedCart, totalPrice});
    } else {
      res.status(200).send(cart); // Send the cart even if it's empty
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving cart" });
  }
};
