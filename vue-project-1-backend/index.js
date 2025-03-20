require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const Port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

const userRoutes = require("./routes/users.route")
const noteRoutes = require("./routes/notes.route")

app.use("/users",userRoutes)
app.use("/notes",noteRoutes)

app.listen(Port,() => {
    console.log(`listening to request on port ${Port}`)
})