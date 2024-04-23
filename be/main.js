const express = require('express');
const cors = require('cors');
const connectToDatabase = require("./db");
const logger = require('./middlewares/logger')
const path = require('path')
require("dotenv").config();


// import delle routes
const usersRoute = require('./route/users');
const newpostRoute = require('./route/newpost');
const loginRoute = require('./route/login');
const emailRoute = require('./route/sendEmail');
const githubRoute = require('./route/github');
const googleRouter = require('./route/google');
const CamelStory =require('./route/CamelStory');
const UserProfile=require('./route/UserProfile');
const PORT = 8080;
const app = express();

//middleware
app.use(express.json());
app.use(cors())

// servire cartella upload con express.static middleware
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use(logger);
app.use('/', usersRoute);
app.use('/', newpostRoute);
app.use('/', loginRoute);
app.use('/', emailRoute);
app.use('/', githubRoute);
app.use('/', googleRouter);
app.use('/', CamelStory);
app.use('/', UserProfile);

connectToDatabase()

app.listen(PORT, () => console.log(`Server connected and listening on port ${PORT}`))