const Sequelize  = require('sequelize');
const sequelizeDb = require("../util/databse");


const Product = sequelizeDb.define('Product', {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement: true
      
    },
    title: Sequelize.STRING,
    price:{
        type: Sequelize.DOUBLE,
        allowNull:false
    },
    discription:{
        type: Sequelize.STRING,
        allowNull:false
    },
    img:{
        type: Sequelize.STRING,
        allowNull:true
    }
  });


  module.exports = Product;