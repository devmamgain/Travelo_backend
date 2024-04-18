const express = require("express")
const router = express.Router()
const hotelmodel = require("../datamodel/hotelmodel")

router.route("/:id")
.get(async (req,res)=>{
    try{
        const {id} = req.params
        const hotel = await hotelmodel.findById(id)
        res.json(hotel)
    }
    catch(err){
        res.status(404).json({message:"no hotel found"})
    }
})

module.exports = router