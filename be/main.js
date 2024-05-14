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
const googleRoute = require('./route/google');
const CamelStoryRoute =require('./route/CamelStory');
const UserProfileRoute=require('./route/UserProfile');
const messageRoute = require('./route/message');
const BioRoute = require('./route/Bio');
const photoRoute = require('./route/photo');
const BannerImages=require('./route/BannerImages');


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
app.use('/', googleRoute);
app.use('/', CamelStoryRoute);
app.use('/', UserProfileRoute);
app.use('/', messageRoute);
app.use('/', BioRoute);
app.use('/', photoRoute);
app.use('/', BannerImages);
connectToDatabase()

app.listen(PORT, () => console.log(`Server connected and listening on port ${PORT}`))