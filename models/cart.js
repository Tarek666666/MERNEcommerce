const Sequelize  = require('sequelize');
const sequelizeDb = require("../util/databse");


const Cart = sequelizeDb.define('cart', {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement: true
      
    },
    total: Sequelize.INTEGER,
    
  });

  module.exports = Cart;

