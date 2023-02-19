require('dotenv').config()


/*
const Sequelize  = require('sequelize');
const sequelize = new Sequelize( 'shop' , 'root' , 'root', {
    
    dialect: 'mysql',
    host: 'localhost'

});


module.exports = sequelize; 

*/



const Sequelize  = require('sequelize');
const sequelize = new Sequelize( 'heroku_60f70c9307f1279' , 'b9a35914efcef8' , '19b25751', {
    
    dialect: 'mysql',
    host: 'eu-cdbr-west-03.cleardb.net'

});


module.exports = sequelize; 