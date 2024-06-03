// Assuming you have the necessary dependencies and models imported
const order = require('../models/order_model');

require ('dotenv')
// Middleware to validate order data
const validateOrderData = async (req, res, next) => {
    const { items, customerName, address } = req.body;

    try{
       await this.schema.validateOrderData(body)
       next();
    } catch (error){
        return res.status(404).json({error})
    }
  
    // Perform validation on the order data
    // For example, check if required fields are present, validate product data, etc.
  
    // If the order data is valid, proceed to the next middleware
    
  };
  
  // Middleware to authenticate the user
  const authenticateUser = (req, res, next) => {
    // Perform user authentication logic
    // For example, check if the user is logged in or has appropriate permissions
    if (!req.user)
    // If the user is authenticated, proceed to the next middleware
    next();
  };
  
  // POST /api/orders
  router.post('/orders', authenticateUser, validateOrderData, (req, res) => {
    const { products, customerName, address } = req.body;
  
    // Create a new order with the provided data
    const order = new Order({
      products,
      customerName,
      address
    });
  
    // Save the order to the database
    order.save()
      .then(savedOrder => {
        res.status(201).json(savedOrder);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
});

module.exports = order