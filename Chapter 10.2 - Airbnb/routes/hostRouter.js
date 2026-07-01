// Core Module
import path from 'path'

// External Module
import express from 'express'
const hostRouter = express.Router();

// Local Module
import rootDir from '../utils/pathUtil.js';
// const rootDir = require("../utils/pathUtil");


hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'addHome.html'));
})

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body)
  res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'));
})

export default hostRouter;