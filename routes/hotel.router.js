const express = require("express")
const router = express.Router()
const Hotel = require("../datamodel/hotelmodel")
router.route("/")
.get(async (req,res) => {
    const hotelcategory = req.query.category;
    const hotelname = req.query.name;
    const hotelstate = req.query.state;
    const pricing = req.query.price;
    const bedrooms = req.query.numberOfBedrooms;
    const beds = req.query.numberOfBeds;
    const bathrooms = req.query.numberOfBathrooms;
    const propertytype = req.query.propertyType;
    const outofstocks = req.query.outofstock;
    try {
        let hotels
        if (hotelcategory || hotelname || hotelstate || pricing || bedrooms || outofstocks || beds) {
            const query = {};
      
            if (hotelcategory) {
              query.category = hotelcategory;
            }
           if (outofstocks){
            query.outofstock = outofstocks;
           }
            if (hotelname) {
              query.name = { $regex: new RegExp(hotelname.trim(), 'i') };
            }
      
            if (hotelstate) {
              query.state = { $regex: new RegExp(hotelstate.trim(), 'i') };
            }

            if(pricing){
              query.price = { $lte: parseInt(pricing) };
            }
            if(bedrooms){
              query.numberOfBedrooms = bedrooms;
            }
              if(beds){
                query.numberOfBeds = beds;
              }
              if(bathrooms){
                query.numberOfBathrooms = bathrooms;
              }
              if(propertytype){
                query.propertyType = propertytype;
              }
       
            hotels = await Hotel.find(query); 
        }
        else{
    hotels = await Hotel.find({})
        }
     hotels ? res.json(hotels) : res.status(404).json({message:"no data found"})
    }
    catch(err){
    console.log(err)
    }
})

module.exports = router