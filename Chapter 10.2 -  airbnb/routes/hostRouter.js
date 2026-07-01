// Core Module
import path from 'path'

// External Module
import express from 'express'
const hostRouter = express.Router();

// Local Module
// const rootDir = require("../utils/pathUtil");

hostRouter.get('/host/add-home', (req, res, next) => {
  res.send(`<h2>Register your Home here:</h2>
    <form action='/host/add-home' method='POST'>
      <input type='text' name='homeName' placeholder='Enter Home Name' required>
      <button type='submit'>Submit</button>
    <form>
    `)
})

hostRouter.post('/host/add-home', (req, res, next) => {
  console.log('body', req.body)
  res.send(`<h2>Home Added Successfully</h2>
   <a href='/'>Go to Home</a>
    `)
})


// hostRouter.get("/add-home", (req, res, next) => {
//   res.sendFile(path.join(rootDir, 'views', 'addHome.html'));
// })

// hostRouter.post("/add-home", (req, res, next) => {
//   res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'));
// })

export default hostRouter;