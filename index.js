const express = require("express")
require('dotenv').config();


const app = express()
const path = require("path")
const port = process.env.PORT
const cors = require("cors")
const connectiondb = require("./mongoose/mongoose")
const sending = require("./sending")
const hotelrouter = require("./routes/hotel.router")
const categoryrouter = require("./routes/category.router")
const singlehotelrouter = require("./routes/singlehotel.router")
const authrouter = require("./routes/auth.router")
const wishlistrouter = require("./routes/wishlist.router")
const orderrouter = require("./routes/order.router")
const emailrouter = require("./routes/email.router")
app.use(cors())
app.use(express.json())
connectiondb()
sending()
app.use("/api/hotel", hotelrouter)
app.use("/api/category", categoryrouter)
app.use("/api/hotel", singlehotelrouter)
app.use("/api/auth", authrouter)
app.use("/api/wishlist", wishlistrouter)
app.use("/api/order", orderrouter)
app.use("/api/email", emailrouter)

app.listen(port, ()=>{
    console.log("server started at ")
}) 