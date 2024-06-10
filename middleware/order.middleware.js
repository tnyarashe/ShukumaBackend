// // Assuming you have the necessary dependencies and models imported
// const order = require('../models/order_model');
// const express = require('express');
// const router = express.Router();

// require ('dotenv')
// // Middleware to validate order data
// const validateOrderData = async (req, res, next) => {
//     const { items, customerName, address } = req.body;

//     try{
//        await this.schema.validateOrderData(body)
//        next();
//     } catch (error){
//         return res.status(404).json({error})
//     }
  
//     // Perform validation on the order data
//     if(!items || !customerName || !address){
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // If the order data is valid, proceed to the next middleware
//     next();    
//   };
  
//   // Middleware to authenticate the user
//   const authenticateUser = (req, res, next) => {
//     // For example, check if the user is logged in or has appropriate permissions
//     if (!req.user)
//         return res.status(401).json({ error: 'Unauthorized' });
//     // If the user is authenticated, proceed to the next middleware
//     next();
//   };
//   // POST /api/orders
//   router.post('/orders', authenticateUser, validateOrderData, (req, res) => {
//     const { items, customerName, address } = req.body;
  
//     // Create a new order with the provided data
//     const order = new Order({
//       items,
//       customerName,
//       address,
//       user: req.user._id
//     });
  
//     // Save the order to the database
//     order.save()
//       .then(savedOrder => {
//         res.status(201).json(savedOrder);
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//       });
// });

// module.exports = order;