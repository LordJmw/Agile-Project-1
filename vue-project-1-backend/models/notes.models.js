const {sequelize,DataTypes} = require("./models")
const Categories = require("./categories.models")

const notes = sequelize.define("notes", {
    title : DataTypes.STRING,
    note : DataTypes.STRING,
    category_id : {
        type : DataTypes.INTEGER,
        //buat referensi ke categories
        references : {
            model : Categories,
            key : "id"
        }
    },
    userId : DataTypes.INTEGER
})


module.exports= notes