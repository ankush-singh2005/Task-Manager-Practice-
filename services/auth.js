const jwt = require('jsonwebtoken');
require('dotenv').config();
const setUser = function(user){
    const payload = {
        _id:user._id,
        email:user.email
    }
    return jwt.sign(payload,process.env.JWT_SECRET);
}

const getUser = function(token){
    if(!token) return null;
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = {
    setUser,
    getUser
}