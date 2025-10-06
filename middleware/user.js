const jwt = require('jsonwebtoken');
const { userModel } = require('../db');
const { JWT_user_SECRET } = require('../config');

function usermiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded=jwt.verify(token, JWT_user_SECRET);

    if (decoded) {
        req.userId = decoded.id;    
        next();
    } else {
        res.status(401).json({
            message: "Your not signed in"
        });
    }
}

module.exports = {
    usermiddleware : usermiddleware
};