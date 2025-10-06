require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || "your-default-secret-key";
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET || "your-default-admin-secret";
const JWT_user_SECRET = process.env.JWT_USER_SECRET || "your-default-user-secret";

module.exports = {
    JWT_SECRET,
    JWT_ADMIN_SECRET,
    JWT_user_SECRET
};