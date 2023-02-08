const Product = require('../models/product');
Product.fetchAll();

exports.getAddProduct = (req , res , next)=>{
    res.render('admin/add-product' , {path: '/admin/add-product' ,  title: 'Admin Add Product'})
}

exports.postAddProduct = (req , res , next)=>{
    const title = req.body.title;
    const img = req.body.img;
    const price = req.body.price;
    const disc = req.body.discription;
    const product = new Product(title,img,price,disc);
    product.save();
    res.redirect(`/`)
}

exports.getProducts = (req , res , next)=>{
    const products = Product.fetchAll();
    
    res.render('admin/products' , {prods:products , path: '/admin/products'  ,  title: 'Admin Products'})
}

exports.deleteProduct=  ('/delete/:id' , async(req , res , next)=>{
    
    Product.deleteProduct(req.params.id)
    const products = Product.fetchAll();
    const selectedProduct = products.find(product => product.id === req.params.id);
    const selectedProductIndex = products.indexOf(selectedProduct);
    products.splice(selectedProductIndex , 1) // when deleting the elemnt index 2 in 3 elemnts in admin page , the resault is not true
    res.render('admin/products' , {prods:products , path: '/admin/products'  ,  title: 'Admin Products'})
    
})

exports.editProduct= ('/edit/:id' , (req , res , next)=>{
    
    const products = Product.fetchAll();
    const selectedProduct = products.find(product => product.id === req.params.id);
    const selectedProductIndex = products.indexOf(selectedProduct);
    
    res.render('admin/edit-product' , {product:selectedProduct , id:req.params.id , path: '/admin/products'  ,  title: 'Admin Products'})
})

exports.postEditProduct= ('/edit/:id' , (req , res , next)=>{
    
    const products = Product.fetchAll();
    const selectedProduct = products.find(product => product.id === req.body.id);
    const selectedProductIndex = products.indexOf(selectedProduct);
    products[selectedProductIndex].title = req.body.title;
    products[selectedProductIndex].img = req.body.img;
    products[selectedProductIndex].price = req.body.price;
    products[selectedProductIndex].disc = req.body.discription;
    products[selectedProductIndex].id = req.body.id;

    Product.saveEditedProduct(products);
    res.render('admin/products' , {prods:products , path: '/admin/products'  ,  title: 'Admin Products'})
})