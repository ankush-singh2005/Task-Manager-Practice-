const {getUser} = require('../services/auth')

const authMiddleware = {
    checkAuth: async (req,res,next) => {
        const userId = req.cookies?.uid;
        if(!userId) return res.render('login', {error: "Please login first"});
        const user = await getUser(userId);
        if (!user) return res.redirect('/login?error=Please login first');
        req.user = user;
        next();
    }
}

module.exports = {
    authMiddleware
}