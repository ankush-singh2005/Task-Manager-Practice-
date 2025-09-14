require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const staticRoutes = require('./routes/staticRoutes')
const taskRoutes = require('./routes/taskRoutes')
const express = require('express');
const app=express();
const mongoose=require('mongoose');
const path = require('path') //we are importing this for using the ejs files.
const cookieParser = require('cookie-parser')
const {authMiddleware} = require('./middlewares/authMiddleware')

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("DB Connected");
})
.catch((err)=> {
    console.log("Error", err);
})

//setting the view engine
app.set('view engine','ejs');
app.set('views', path.resolve('./views'));

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/auth",authRoutes)
// app.use("/", )
app.use("/", authMiddleware.checkAuth, staticRoutes)
app.use("/tasks", authMiddleware.checkAuth, taskRoutes);


//listening
app.listen(process.env.PORT, (err) => {
    if(err) console.log("Not started", err);
    else console.log("Started");
})