const express = require("express")
const router = express.Router()
const usermodel = require("../datamodel/user.model")
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken")
router.route("/register")
.post(async (req,res) => {
    try{
      const users = {
        username: req.body.username,
        number: req.body.number,
        email: req.body.email,
        password : CryptoJs.AES.encrypt(req.body.password, devmamgain23).toString()
      }
      const newUser= new usermodel(users)
      const saveuser = await newUser.save()
      res.json(saveuser)
    }
    catch(err){
        res.status(500).json({message : "error creating user"})
    }
   
    }
)

router.route("/login")
.post(async (req,res)=>{
    try{
       const number = await usermodel.findOne({number : req.body.number})
       !number && res.status(401).json({message:"Number not found"})
       const passworddecoded = CryptoJs.AES.decrypt(req.body.password, devmamgain23).toString(CryptoJS.enc.Utf8)
       passworddecoded !== req.body.password && res.status(401).json({message:"password incorrect"})
       const {password, ...rest} = number._doc
       const accessToken = jwt.sign({user: number.username}, devmamgain43)
       res.json({...rest, accessToken})
    }catch(err){
        console.log(err)
    }
})

module.exports = router