const hoteldata = require("./data/data")
const hotelmodel = require("./datamodel/hotelmodel")
const categorydata = require("./data/categorydata")
const categorymodel = require("./datamodel/categorymodel")
const mongoose= require("mongoose")

const sending = async()=>{
    const count = await hotelmodel.countDocuments()
    if(count===0){
    await hotelmodel.insertMany(hoteldata)
    }
    const countcategory = await categorymodel.countDocuments()
    if(countcategory===0){
        await categorymodel.insertMany(categorydata)
    }
}

module.exports = sending