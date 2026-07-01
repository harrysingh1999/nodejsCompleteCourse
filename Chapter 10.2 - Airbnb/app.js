// Core Module
// const path = require('path');
import path from 'path'

// External Module
// const express = require('express');
import express from 'express'

//Local Module
import userRouter from './routes/userRouter.js';
import hostRouter from './routes/hostRouter.js';
import rootDir from './utils/pathUtil.js';


const app = express();

app.use(express.urlencoded({ extended: true })) // using Inbuilt parsing method of Express to parse Request body...............

app.use(userRouter); // User related routes now being handled by userRouter.........................

app.use('/host', hostRouter); // All Host related routes (get, post etc), are now being handled by HostRouter.........................

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});