require('dotenv').config()


const Sequelize  = require('sequelize');
const sequelize = new Sequelize(  process.env.DATABASE || 'shop' , process.env.USER || 'root' , process.env.PASSWORD ||  'root', {
    
    dialect: 'mysql',
    host: process.env.HOST ||  'localhost'

});


module.exports = sequelize; 