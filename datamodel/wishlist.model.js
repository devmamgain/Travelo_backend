const mongoose = require("mongoose")
const wishlistSchema = new mongoose.Schema({
    hotelId: {type:String,required:true},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }

})
module.exports = mongoose.model("Wishlist", wishlistSchema)