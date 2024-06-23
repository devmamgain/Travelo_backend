const express = require("express")
const router = express.Router()
const ordermodel = require("../datamodel/ordermodel")
const verifyUser = require("../middleware/verifyuser");
const Hotel = require("../datamodel/hotelmodel"); // Assuming this is where your Hotel model is defined

router.post("/postorder",verifyUser, async(req,res)=>{
    const {hotelId,paymentId,totalamount,Days} = req.body
    const userId = req.user.id; // Assuming verifyUser adds user to req
    if(!hotelId || !paymentId || !Days || !totalamount || !userId)
        {
            return res.status(400).json({ message: "missing" });
          }
          const neworder = new ordermodel({hotelId,userId,paymentId,Days,totalamount})
          try {
            const savedOrder = await neworder.save();
            res.status(201).json(savedOrder);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to create wishlist" });
        }
})
router.get("/getorder", verifyUser, async (req, res) => {
    const userId = req.user.id; // Assuming verifyUser adds user to req

    try {
        const orderlist = await ordermodel.find({ userId }).select("-userId")
        if (orderlist.length > 0) {
            const hotelIds = orderlist.map(item => item.hotelId); // Extracting hotelIds from wishlistItems

            // Query hotels collection to fetch details for all hotelIds
            const hotels = await Hotel.find({ _id: { $in: hotelIds } });
            const hotelMap = hotels.reduce((map, hotel) => {
                map[hotel._id] = hotel;
                return map;
            }, {});

            // Combine order details with corresponding hotel details
            const combinedList = orderlist.map(order => {
                return {
                    ...order._doc, // Use _doc to get the raw document if using Mongoose
                    hotelDetails: hotelMap[order.hotelId]
                };
            });

            res.json(combinedList); // Send the combined list as the response
   
        
        } else {
            res.json({ message: "No items found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
module.exports = router;
