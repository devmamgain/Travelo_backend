const mongoose = require("mongoose")
require('dotenv').config();

const mongolinkpass = process.env.DB_PASS
const connection = async ()=>{
    await mongoose.connect(mongolinkpass)
}

module.exports= connection