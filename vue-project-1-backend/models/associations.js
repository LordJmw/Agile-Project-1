const notes = require("./notes.models")
const categories = require("./categories.models")

//1 kategori bisa dimiliki banyak notes sehingga pake hasMany
categories.hasMany(notes, { foreignKey: "category_id", as: "notes" });
//1 note cuma bisa pake 1 category jadi pake belongsTo
notes.belongsTo(categories, { foreignKey: "category_id", as: "category" });

module.exports = { notes, categories };

//file ini dibuat untuk jelasin hubungan antara notes dan categories