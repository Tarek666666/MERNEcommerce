const Sequelize  = require('sequelize');
const sequelizeDb = require("../util/databse");


const User = sequelizeDb.define('user', {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement: true
      
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
  });


  module.exports = User;