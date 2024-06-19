const express = require("express");
const router = express.Router();
const WishlistModel = require("../datamodel/wishlist.model");
const verifyUser = require("../middleware/verifyuser");
const Hotel = require("../datamodel/hotelmodel"); // Assuming this is where your Hotel model is defined

// POST request to create a new wishlist item
router.post('/postwish', verifyUser, async (req, res) => {
    const { hotelId } = req.body;
    const userId = req.user.id; // Assuming verifyUser adds user to req


    // Ensure the required field is provided
    if (!hotelId) {
        return res.status(400).json({ message: "hotelId is required" });
    }

    const newWishlistItem = new WishlistModel({ hotelId, userId });

    try {
        const savedWishlistItem = await newWishlistItem.save();
        res.status(201).json(savedWishlistItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create wishlist" });
    }
});

// DELETE request to remove a wishlist item by ID
router.delete('/:hotelId', verifyUser, async (req, res) => {
    const userId = req.user.id; // Assuming verifyUser adds user to req
    const hotelId = req.params.hotelId;

    try {
        const wishlistItem = await WishlistModel.findOneAndDelete({ hotelId, userId });
        if (wishlistItem) {
            res.json({ message: "Hotel deleted from wishlist" });
        } else {
            res.status(404).json({ message: "Wishlist item not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Could not delete hotel from wishlist" });
    }
});
// GET request to fetch all wishlist items
router.get('/getwish', verifyUser, async (req, res) => {
    const userId = req.user.id; // Assuming verifyUser adds user to req

    try {
        const wishlist = await WishlistModel.find({ userId })
        if (wishlist.length > 0) {
            const hotelIds = wishlist.map(item => item.hotelId); // Extracting hotelIds from wishlistItems

            // Query hotels collection to fetch details for all hotelIds
            const hotels = await Hotel.find({ _id: { $in: hotelIds } });

            res.json(hotels); // Send the array of hotel details as response
        
        } else {
            res.json({ message: "No items found in the wishlist" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
