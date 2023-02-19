const Product = require("../models/product");
const User = require("../models/user");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", { path: "/admin/add-product", title: "Admin Add Product" });
};

// add new products
exports.postAddProduct = (req, res, next) => {
    // props we get from the requested body
    const title = req.body.title;
    const img = req.body.img;
    const price = req.body.price;
    const disc = req.body.discription;
    //create the new product and add it to products table
    req.user
        .createProduct({ title: title, price: price, discription: disc, img: img })
        .then((data) => {
            res.redirect(`/admin/products`);
        })
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
    console.log(req.user)
    if(req.user){
        req.user
        .getProducts()
        // Product.findAll()
        .then((data) => {
            res.render("admin/products", {
                prods: data,
                path: "/admin/products",
                title: "Admin Products",
            });
        })
        .catch((err) => console.log(err));
    }else{
        const user = new User()
        User.create({name:'Tarek' , email:'2b3zab666@gmail.com'}).then(user =>{

            user.getProducts()
            // Product.findAll()
            .then((data) => {
                res.render("admin/products", {
                    prods: data,
                    path: "/admin/products",
                    title: "Admin Products",
                });
            })
            .catch((err) => console.log(err));

        })
       

    }
};

exports.deleteProduct =
    ("/delete/:id",
    async (req, res, next) => {
        Product.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.redirect("/admin/products");
    });

exports.editProduct =
    ("/edit/:id",
    (req, res, next) => {
        const selectedProduct = Product.findOne({ where: { id: req.params.id } });
        selectedProduct
            .then((data) => {
                res.render("admin/edit-product", {
                    product: data,
                    id: req.params.id,
                    path: "/admin/products",
                    title: "Admin Products",
                });
            })
            .catch((err) => console.log(err));
    });

exports.postEditProduct =
    ("/edit/:id",
    (req, res, next) => {
        Product.update(
            {
                title: req.body.title,
                price: req.body.price,
                discription: req.body.discription,
                img: req.body.img,
            },
            {
                where: {
                    id: req.body.id,
                },
            }
        );
        res.redirect("/admin/products");
    });
