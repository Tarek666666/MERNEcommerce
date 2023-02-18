const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop')

// all routes for nomral user
router.get('/' , shopController.getShop);
router.get('/product/:id' , shopController.getProductDetails);
router.get('/cart' , shopController.getCart);
router.post('/cart/:id' , shopController.postCart);
router.post('/cart/delete/:id' , shopController.deleteCartItem);




module.exports.routes = router;