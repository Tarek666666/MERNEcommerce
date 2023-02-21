require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/error')
const sequelizeDb = require("./util/databse");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

let port =  process.env.PORT || 5000

app.use(express.urlencoded({extended:false}));
//setting the static file for our css and js files
app.use(express.static(path.join(__dirname , '/public')))
app.set("views", "views");
app.set("view engine", "pug");

// middleware to search for id 1  user in database, when it finds it, it will assign it's value to the request object
app.use( (req,res,next)=>{

    User.findOne({where: {name:'Tarek'}})
    .then(user =>{
        req.user = user;
        next();

    })
    .catch(err=>console.log(err))
    
})
// the routes for shop , admin  , 404 page
app.use(shopRouter.routes)
app.use('/admin' , adminData.routes)
app.use(errorController.get404Page)



//initialize relations between Product and User
Product.belongsTo(User, {constraints:true , onDelete: 'cascade'});
User.hasMany(Product);
//initialize relations between User and Cart
User.hasOne(Cart);
Cart.belongsTo(User);
//initialize relations between Products and Cart
Cart.belongsToMany(Product , {through : CartItem});
Product.belongsToMany(Cart , {through : CartItem});


// connect to shop database; the dialect to my sql
sequelizeDb
.sync()
.then(res => {
// after connecting to the database shop, seach for user with id 1 and return it
    return User.findAll({where: {name:'Tarek'}})
})
.then(user => {

// if user with id 1 is not found => create user with provided data
    if(user.length <= 0){
        return  User.create({name:'Tarek' , email:'2b3zab666@gmail.com'})
    }
// if user with id 1 is found => returd user    

    return user[0];
})
.then(user =>{
// creating a cart for the user after being created or found    

    user.getCart().then(cart => {
        if(!cart){
            return user.createCart({total:0});
        }
        
        return cart;
    }).catch(err =>console.log(err))
    
})
.then(cart =>{
    app.listen(port,()=>{console.log('servere is running on port : 5000'   )})
})
.catch(err => console.log(err));

