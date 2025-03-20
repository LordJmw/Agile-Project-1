const {sequelize,DataTypes} = require("./models")

const users = sequelize.define("users",{
    FirstName : DataTypes.STRING,
    LastName : DataTypes.STRING,
    email : DataTypes.STRING,
    password : DataTypes.STRING,
    isAdmin : DataTypes.INTEGER
})

module.exports = users