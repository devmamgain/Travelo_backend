const express = require("express")
const router = express.Router()
const categorymodel = require("../datamodel/categorymodel")
router.route("/")
.get(async (req,res) => {
    try{
    const categories = await categorymodel.find({})
    res.json(categories)
    }
    catch(err){
        res.status(404).json({message:"no category found"})
    }
   
    }
)

module.exports = router