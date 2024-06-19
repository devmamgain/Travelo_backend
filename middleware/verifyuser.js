const jwt = require("jsonwebtoken");

const verifyuser = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (token) {
        const tokenauth = token.startsWith('Bearer ') ? token.slice(7, token.length) : token; // Extract token without 'Bearer ' prefix

        jwt.verify(tokenauth, 'devmamgain43', (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid Token" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "No token provided" });
    }
};

module.exports = verifyuser;
