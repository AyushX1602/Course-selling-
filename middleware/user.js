const jwt = require('jsonwebtoken');
const { userModel } = require('../db');
const { JWT_user_SECRET } = require('../config');

function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header required"
        });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    if (!token) {
        return res.status(401).json({
            message: "Authorization token required"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_user_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            error: error.message
        });
    }
}

module.exports = {
    usermiddleware: userMiddleware
};