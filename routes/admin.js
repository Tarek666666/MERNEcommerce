const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')


//all routes for admin user
router.get('/products' , adminController.getProducts )
router.get('/add-product' , adminController.getAddProduct );
router.post('/add-product' , adminController.postAddProduct);
router.get('/delete/:id' , adminController.deleteProduct);
router.get('/edit/:id' , adminController.editProduct);
router.post('/edit' , adminController.postEditProduct);



exports.routes = router;
