const Cart = require('../models/cart_models')

const Product = require('../models/product_model');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).send({ message: "Invalid product ID or quantity" });
    }
    const id = "66848014761d135fb60d8a01"
    
    const cart = await Cart.findOne({ userId: id });

    
    if (!cart) {
      const newCart = new Cart({ userId: id });
      cart = await newCart.save();
      console.log(cart)
    }

   
    const product = await Product.findById(productId);
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


    res.status(200).send({ message: "Item added to cart successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding item to cart" });
  }
};


exports.getCart = async (req, res) => {
    try {
      // Find the user's cart based on their ID (replace with your logic)
      const cart = await Cart.findOne({ userId: req.userId });
  
      if (!cart) {
        return res.status(200).send({ message: "Cart not found" }); // Or send an empty cart object
      }
  
      // Populate product details for each item in the cart (optional)
      if (cart.items.length > 0) {
        const populatedCart = await Cart.populate(cart, { path: 'items.productId' });
        res.status(200).send(populatedCart);
      } else {
        res.status(200).send(cart); // Send the cart even if it's empty
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error retrieving cart" });
    }
  };

// exports.getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findById(req.params.cartId);
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.addToCart = async (req, res) => {
  const { productId, quantity, price } = req.body;

  try {
    let cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      cart = new Cart();
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = price;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

    await cart.save();
    res.status(201).json(cart);
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
