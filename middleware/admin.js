const jwt = require('jsonwebtoken');
const { adminModel } = require('../db');
const { JWT_admin_SECRET } = require('../config');

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_admin_SECRET);

    if (decoded) {
        req.adminId = decoded.id;
        next();
    } else {
        res.status(401).json({
            message: "Your not signed in"
        });
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
};

    if (decoded) {
        req.userId = decoded.id;    
        next();
    } else {
        res.status(401).json({
            message: "Your not signed in"
        });
    }


module.exports = {
    usermiddleware : usermiddleware
};