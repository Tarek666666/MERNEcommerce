const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename) , 'data/data.json')
let products = [];

module.exports = class Product{

    constructor(title,img,price,disc){
        this.title = title,
        this.img = img , 
        this.price = price,
        this.disc = disc;
        this.id = Math.random().toString();
        products.push(this)
       
    }
    save(){
       
        fs.readFile(p , (err , content)=>{
         
            if(!err){
                products = JSON.parse(content);
                products.push(this)
            }
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err)
                  console.log(err);
                else {
                  console.log("File written successfully\n");
                }
              });

        })
    }

static fetchAll(){
  
  fs.readFile(p , (err , content)=>{
    if(content){
      products = JSON.parse(content);
    }
   })

   return products
}

static deleteProduct(id){
  
  fs.readFile(p , (err , content)=>{
    let filterdProducts = [];
    if(content){
      products = JSON.parse(content);
      filterdProducts = products.filter(product => product.id !== id);
      fs.writeFile(p, JSON.stringify(filterdProducts) ,(err)=>{

         
      })
     
    }
   })

   return products
}
static editProduct(){


  fs.readFile(p , (err , content)=>{
    let filterdProducts = [];
    if(content){
      products = JSON.parse(content);
      filterdProducts.push(products)
      fs.writeFile(p, JSON.stringify(filterdProducts) ,(err)=>{
         
      })
     
    }
   })
  

}

static saveEditedProduct(products){

  fs.writeFile(p, JSON.stringify(products) ,(err)=>{
         
  })

}

}

