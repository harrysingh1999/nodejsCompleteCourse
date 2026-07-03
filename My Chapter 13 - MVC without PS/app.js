// Core Module
// const path = require('path');
import path from "path";

// External Module
import express from "express";

//Local Module
// const userRouter = require("./routes/userRouter")
// const {hostRouter} = require("./routes/hostRouter")
// const rootDir = require("./utils/pathUtil");

import {userRouter} from "./routes/userRouter.js";
import { hostRouter } from "./routes/hostRouter.js";
import rootDir from "./utils/pathUtil.js";
import {notFoundPage} from './controllers/errorController.js'

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(notFoundPage)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});