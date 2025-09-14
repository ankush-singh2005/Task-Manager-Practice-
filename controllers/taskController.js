const mongoose = require('mongoose');
const Task = require('../models/tasks');

const taskController = {
    getTasks: async(req,res) => {
        const user = req.user;
        try {
            const user = req.user;
            if(!user) return res.redirect("/login?error=Please log in first");
            const allTasks = await Task.find({user:user._id});
            return res.render('home', { tasks: allTasks, user: req.user });
        } catch (error) {
            return res.status(400).json({message:"Intenal servel error"})
        }

    },

    setTasks: async(req,res) => {
        const {task} = req.body;
        if(!task) return res.status(400).json({message:"You need to enter a task"});
        try {
            await Task.create({
                title: task,
                user: req.user._id
            });
            const allTasks = await Task.find({ user: req.user._id });
            return res.redirect('/');
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = {taskController};