const {sequelize,DataTypes} = require("./models")
const Notes = require("./notes.models")

const categories = sequelize.define("categories",{
    category : DataTypes.STRING,
    color : DataTypes.STRING,
    icon : DataTypes.STRING
})

module.exports = categories