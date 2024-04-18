const mongoose = require("mongoose")
const connection = async ()=>{
    await mongoose.connect("mongodb+srv://devmamgain123:Boltzman123@testinglearning.ltdjpi8.mongodb.net/?retryWrites=true&w=majority")
}

module.exports= connection