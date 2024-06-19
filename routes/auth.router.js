const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const usermodel = require("../datamodel/user.model");
const verifyToken = require("../middleware/verifyuser")

router.post("/register", async (req, res) => {
    try {
        const { username, number, email, password } = req.body;
        const existingUser = await usermodel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const users = {
            username,
            number,
            email,
            password: hashedPassword
        };
        const newUser = new usermodel(users);
        const saveuser = await newUser.save();
        const token = jwt.sign({ id: saveuser._id, email: saveuser.email }, 'devmamgain43');
        res.json({ user: saveuser, token });
    } catch (err) {
        res.status(500).json({ message: "error creating user" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, email: user.email }, 'devmamgain43');
            res.json({ token });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: "error logging in" });
    }
});

router.get('/user', verifyToken, async (req, res) => {
  try {
      const user = await usermodel.findById(req.user.id).select('-password');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching user data' });
  }
});

module.exports = router