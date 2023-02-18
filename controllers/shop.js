const Product = require("../models/product");
const Cart = require("../models/cart");
let fetchedCart;

exports.getShop =
    ("/",
    (req, res, next) => {
        //fetching all products from the data base
        Product.findAll().then((data) => {
            res.render("shop/shop", { prods: data, path: "/", title: "Home" });
        });
    });

exports.getProductDetails =
    ("/product/:id",
    (req, res, next) => {
        //fetching a single product from the data base, based on the id passed in the request
        Product.findOne({ where: { id: req.params.id } })
            .then((data) => {
                res.render("shop/product-details", { product: data, path: "/", title: "Home" });
            })
            .catch((err) => console.log(err));
    });

exports.getCart =
    ("/cart",
    (req, res, next) => {
        let updatedTotal = 0;
        //fetching the user's cart then fetching the products from the cart
        req.user
            .getCart()
            .then((cart) => {
                return cart
                    .getProducts()
                    .then((products) => {
                        //update total cart value each time item is added
                        products.forEach((prod) => {
                            updatedTotal += prod["cart-item"].qty * prod.price;
                        });
                        cart.update({ total: updatedTotal });

                        res.render("shop/cart", {
                            cartItems: products,
                            total: cart.total,
                            path: "/cart",
                            title: "Cart",
                        });
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    });

exports.postCart =
    ("/cart/:id",
    (req, res, next) => {
        const prodId = req.params.id;
        //fetching the user's cart and making an instance of it , fetch a single product that matches the id in the request and return it
        req.user
            .getCart()
            .then((cart) => {
                fetchedCart = cart;
                return cart.getProducts({ where: { id: prodId } });
            })
            .then((products) => {
                res.redirect("/cart");
                let product;
                let newQty = 1;
                //check if the new product is already exsists in the cart or not
                if (products.length > 0) {
                    product = products[0];
                }
                //if products already in cart => increase qty by 1
                // add the product to the cart items table through column qty
                if (product) {
                    let oldQty = product["cart-item"].qty;
                    newQty = oldQty + 1;
                    return fetchedCart.addProduct(product, { through: { qty: newQty } });
                }
                //if products is not in the cart => add the product to cart items table through column qty
                return Product.findAll({ where: { id: prodId } }).then((product) => {
                    fetchedCart.addProduct(product, { through: { qty: newQty } });
                });
            })
            .catch((err) => console.log(err));
    });

exports.deleteCartItem =
    ("/cart/delete/:id",
    (req, res, next) => {
        req.user
            .getCart()
            .then((cart) => {
                cart.getProducts({ where: { id: req.params.id } })
                    .then((prod) => {
                        prod[0]["cart-item"].destroy();

                        console.log(prod[0]);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        res.redirect("/cart");
    });

exports.getProducts =
    ("/products",
    (req, res, next) => {
        Product.findAll()
            .then((data) => {
                res.render("shop/products-shop", {
                    prods: data,
                    path: "/products-shop",
                    title: "Products",
                });
            })
            .catch((err) => console.log(err));
    });
