const mongoose = require("mongoose")
const wishlistSchema = new mongoose.Schema({
    hotelId: {type:String,required:true}
})
module.exports = mongoose.model("Wishlist", wishlistSchema)