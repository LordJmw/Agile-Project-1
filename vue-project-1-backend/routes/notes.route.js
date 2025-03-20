const express = require("express")
const router = express.Router()
const {notes,categories} = require("./../models/associations")

router.get("/",async (req,res) => {
    const result = await notes.findAll({
        //karena di association.js sudah dibuat hubungannya maka disini tinggal pake include
        include : {
            model : categories,
            //untuk as samakan dengan yang didefine di file association
            as : "category",
            attributes : ["category"]
        }
    })

    res.status(200).json({
        data : result
    })
})

router.get("/:id",(req,res) => {
    const id = req.params.id
    notes.findOne({
        where : {
            id : id
        },
        include : {
            model : categories,
            as : "category",
            attributes :['category']
        }
    }).then(response => {
        res.status(200).json({
            data : response
        })
    }).catch(err => console.log(err))
})

router.post("/add", async (req, res) => {
    try {
        const { note, title, category } = req.body;

        const categoryRecord = await categories.findOne({
            where: { category },
            attributes: ["id"]
        });

        const category_id = categoryRecord ? categoryRecord.id : null;

        if (!category_id) {
            return res.status(400).json({
                message: "Invalid category",
                status: 400
            });
        }

        await notes.create({
            note,
            title,
            category_id,
            userId: 6
        });

        res.status(200).json({
            message: "Data added successfully",
            status: 200
        });
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
            error: error.message
        });
    }
});

router.put("/:id", async (req,res) => {
    const id = req.params.id
    const {title,note,category,userId} = req.body
    console.log(note,title,category,userId)
    const categoryRecord = await categories.findOne({
        where: { category },
        attributes: ["id"]
    });

    const category_id = categoryRecord ? categoryRecord.id : null;
    console.log(category_id)

    await notes.update({
        userId,
        note,
        title,
        category_id
    }, {
        where : {id : id}
    })

    res.status(200).json({
        status : 200,
        message : "Edited successfully"
    })
})

router.delete("/:id",async (req,res) => {
    try {
        const id = req.params.id

        if(!id){
            return res.status(400).json({
                message : "id of note is required"
            })
        }

        await notes.destroy({
            where : {
                id : id
            }
        })

        res.status(200).json({
            status : 200,
            message : "note deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message : "internal server error"
        })
    }
})

module.exports = router