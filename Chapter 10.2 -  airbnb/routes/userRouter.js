// Core Modules
// const path = require('path');
import path from 'path'

// External Module
import express from 'express'
const userRouter = express.Router();

// Local Module
// const rootDir = require("../utils/pathUtil");

userRouter.get('/', (req, res, next) => {
  res.send(`<h1>Welcome to Airbnb</h1>
    <a href='/host/add-home'>Add Home</a>`)
})

// userRouter.get("/", (req, res, next) => {
//   res.sendFile(path.join(rootDir, 'views', 'home.html'));
// });

export default userRouter;