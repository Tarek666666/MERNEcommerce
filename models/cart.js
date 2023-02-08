const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename), "data/cart.json");
const util = require("util");

module.exports = class Cart {
    static addProductToCart(selectedProduct) {
        let cart = { products: [], totalPrice: 0 };
        //fetch the old cart
        fs.readFile(p, (err, content) => {
            if (!err) {
                cart = JSON.parse(content);
            }

            const existingProductIndex = cart.products.findIndex(
                (product) => product.id === selectedProduct.id
            );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id: selectedProduct.id,
                    title: selectedProduct.title,
                    img: selectedProduct.img,
                    disc: selectedProduct.disc,
                    qty: 1,
                    price: selectedProduct.price,
                };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = parseInt(cart.totalPrice) + parseInt(selectedProduct.price);
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteItem(id) {
        const cart = fs.readFileSync(p);
        const parsedCart = JSON.parse(cart);
        const filterdCart = parsedCart.products.filter((items) => items.id !== id);
        const deletedItemIndex = parsedCart.products.findIndex((item) => item.id === id);
        const deletedItem = parsedCart.products[deletedItemIndex];
        parsedCart.products = filterdCart;
        parsedCart.totalPrice -= deletedItem.price * deletedItem.qty;
        fs.writeFileSync(p, JSON.stringify(parsedCart));
    }

    static fetchCart() {
        try {
            const cart = fs.readFileSync(p);
            const pardsedCart = JSON.parse(cart);
            return pardsedCart;
        } catch (error) {
            return { products: [], totalPrice: 0 };
        }
    }
};
