const Product = require('../models/product');
const products = Product.fetchAll();

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
    products.then(data => {
        res.render('admin/products' , {prods:data , path: '/admin/products'  ,  title: 'Admin Products'})
    }).catch(err=>console.log(err))
}

exports.deleteProduct=  ('/delete/:id' , async(req , res , next)=>{
    
    Product.deleteProduct(req.params.id)
    res.redirect('/admin/products')
 
})

exports.editProduct= ('/edit/:id' , (req , res , next)=>{
    
    const products = Product.fetchAll();
    products.then(data => {
        const selectedProduct = data.find(product => product.id === parseInt(req.params.id));
        res.render('admin/edit-product' , {product:selectedProduct , id:req.params.id , path: '/admin/products'  ,  title: 'Admin Products'})

    }).catch(err=>console.log(err))
   
})

exports.postEditProduct= ('/edit/:id' , (req , res , next)=>{

    


    Product.editProduct(req.body.id , req.body.title , req.body.discription , req.body.price , req.body.img );
       
    res.redirect('/admin/products')


})