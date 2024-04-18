const express = require("express")
const router = express.Router()
const wishlistmodel = require("../datamodel/wishlist.model")
const verifyuser = require("../middleware/verifyuser")
router.route("/")
.post(verifyuser, async (req,res) => {
    const newwishlist = new wishlistmodel(req.body)
    try{
    const savedwishlist = await newwishlist.save()
    res.status(201).json(savedwishlist)
    }
    catch(err){
        res.status(500).json({message:"failed to create wishlist"})
    }
   
    }
)
router.route("/:id")
.delete(verifyuser, async (req,res) => {
    try{
    await wishlistmodel.findByIdAndDelete(req.params.id)
    res.json({message:"Hotel deleted from wishlist"})
    }
    catch(err){
        res.status(500).json({message:"Could not delete hotel from wishlist"})
    }
   
    }
)
router.route("/")
.get(verifyuser, async (req,res)=>{
    try{
       const wishlist = await wishlistmodel.find({})
       wishlist ? res.json(wishlist) : res.json({message: "No items found in the wishlist"})
    }
    catch(err){
    console.log(err)
    res.status(500).json(err)
    }
})
module.exports = router