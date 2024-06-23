const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    hotelId: {type:String,required:true},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    paymentId: {type:String,required:true},
    totalamount: {type:Number,required:true},
    Days:{type:String,required:true}
})
module.exports = mongoose.model("Orders", orderSchema)