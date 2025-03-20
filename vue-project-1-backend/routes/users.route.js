const express = require("express")
const router = express.Router()
const Users = require("./../models/users.models")

router.get("/", async (req,res) => {
    const users = await Users.findAll()
    res.status(200).json({
        data : users
    })
})

module.exports = router