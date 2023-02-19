require('dotenv').config()

console.log(process.env.CLEARDB_DATABASE_URL)


const Sequelize  = require('sequelize');
const sequelize = new Sequelize( 'mysql://b9a35914efcef8:19b25751@eu-cdbr-west-03.cleardb.net/heroku_60f70c9307f1279?reconnect=true' , 'b9a35914efcef8' , '19b25751', {
    
    dialect: 'mysql',
    host: 'eu-cdbr-west-03.cleardb.net'

});


module.exports = sequelize;