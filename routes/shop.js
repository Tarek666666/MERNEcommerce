const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop')


router.get('/' , shopController.getShop);
router.get('/cart' , shopController.getCart);
router.post('/cart/:id' , shopController.postCart);
router.get('/products' , shopController.getProducts);
router.get('/product/:id' , shopController.getProductDetails);
router.post('/cart/delete/:id' , shopController.deleteCartItem);




module.exports = router;