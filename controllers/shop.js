const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getShop =
    ("/",
    (req, res, next) => {
    const products = Product.fetchAll();
    products.then(data => {
        res.render("shop/shop", { prods: data, path: "/", title: "Home" });
       }).catch(err => console.log(err))

    });



exports.getProductDetails =
    ("/product/:id",
    (req, res, next) => {
        const products = Product.fetchAll();
        products.then(data => {
        const selectedProduct = data.find((product) => product.id === parseInt(req.params.id));
        console.log(selectedProduct)
        res.render("shop/product-details", { product: selectedProduct, path: "/", title: "Home" });
       }).catch(err => console.log(err))
       
    });

exports.getCart =
    ("/cart",
    (req, res, next) => {
        const cartItems = Cart.fetchCart();
        res.render("shop/cart", {
            cartItems: cartItems.products,
            total: parseFloat(cartItems.totalPrice).toFixed(2),
            path: "/cart",
            title: "Cart",
        });
    });

exports.postCart =
    ("/cart/:id",
    (req, res, next) => {
        const cartItems = Cart.fetchCart();
        const products = Product.fetchAll();
        const selectedProduct = products.find((product) => product.id === req.params.id);
        Cart.addProductToCart(selectedProduct);
        res.redirect("/cart");
    });

exports.deleteCartItem =
    ("/cart/delete/:id",
    (req, res, next) => {
        Cart.deleteItem(req.params.id);
        res.redirect("/cart");
    });

exports.getProducts =
    ("/products",
    (req, res, next) => {
        const products = Product.fetchAll();
        products.then(data => {
        res.render("shop/products-shop", { prods: data, path: "/products-shop", title: "Products" });
       }).catch(err => console.log(err))
    });
