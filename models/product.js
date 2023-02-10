const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename), "data/data.json");
const db = require("../util/databse");


module.exports = class Product {
    constructor( title, img, price, disc) {
        (this.title = title), (this.img = img), (this.price = price), (this.disc = disc);
  
    }

    static fetchAll() {
       
        return db.execute("SELECT * FROM products")
        .then((data) => {
            return data[0]
        })
        .catch((err) => console.log(err));
    }
    save() {

        return db.execute("INSERT INTO products(title, discription, price, img) VALUES (?,?,?,?)" , [
            this.title , this.disc , this.price , this.img
        ])
    }

    static deleteProduct(id) {
     
        return db.execute(`DELETE FROM products WHERE id=?;` , [id] );
    }
    static editProduct(id , title , disc , price , img) {
        
        return db.execute(`UPDATE products set title = '${title}', discription = '${disc}', price = '${price}', img = '${img}' WHERE id = '${id}'`);

    }

};
