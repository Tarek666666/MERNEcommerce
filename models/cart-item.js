const Sequelize  = require('sequelize');
const sequelizeDb = require("../util/databse");


const CartItem = sequelizeDb.define('cart-item', {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement: true
      
    },
    qty: Sequelize.INTEGER,
    
  });


  module.exports = CartItem;