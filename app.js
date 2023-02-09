const express = require('express');
const app = express();
const path = require('path');
const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/error')



app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname , '/public')))


app.set("views", "views");
app.set("view engine", "pug");
app.use(shopRouter.routes)
app.use('/admin' , adminData.routes)
app.use(errorController.get404Page)





app.listen(3000,()=>{

    console.log('servere is running on port : 3000' )
})