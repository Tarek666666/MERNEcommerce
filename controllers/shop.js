const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getShop =
    ("/",
    (req, res, next) => {
        const products = Product.fetchAll();
        res.render("shop/shop", { prods: products, path: "/", title: "Home" });
    });

exports.getProductDetails =
    ("/product/:id",
    (req, res, next) => {
        const products = Product.fetchAll();
        const selectedProduct = products.find((product) => product.id === req.params.id);
        console.log(selectedProduct);
        res.render("shop/product-details", { product: selectedProduct, path: "/", title: "Home" });
    });

exports.getCart =
    ("/cart",
    (req, res, next) => {
        const cartItems = Cart.fetchCart();
        res.render("shop/cart", {
            cartItems: cartItems.products,
            total: cartItems.totalPrice,
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
        res.render("shop/products-shop", {
            prods: products,
            path: "/products-shop",
            title: "Products",
        });
    });
