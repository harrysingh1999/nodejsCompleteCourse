// Core Modules
// const path = require('path');
import path from 'path'

// External Module
import express from 'express'
const userRouter = express.Router();

// Local Module
// const rootDir = require("../utils/pathUtil");
import rootDir from '../utils/pathUtil.js';

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'home.html')); // Serving HTML file using sendFile method of Express..............
});

export default userRouter;