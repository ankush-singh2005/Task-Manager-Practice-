const express = require('express')
const router = express.Router();
const Tasks = require('../models/tasks');

router.get('/', async (req,res) => {
    const user = req.user;
    if(!user)  return res.redirect('/login?error=Please login first');

    const allTasks = await Tasks.find({user:req.user._id});
    return res.render('home', {
        tasks:allTasks
    })
})

router.get('/signup', (req,res) => {
    return res.render('signup');
})

router.get('/login', (req,res) => {
    return res.render('login');
})

module.exports = router;