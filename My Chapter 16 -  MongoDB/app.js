// Core Module
// const path = require('path');
import path from "path";

// External Module
import express from "express";

//Local Module

import rootDir from "./utils/pathUtil.js";
import {notFoundPage} from './controllers/errorController.js'
import { hostRouter } from "./routes/hostRouter.js";
import { storeRouter } from "./routes/storeRouter.js";
import { mongodbConnect } from "./utils/databaseUtil.js";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter); 
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(notFoundPage)

const PORT = 3001;

const connect = await mongodbConnect()

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});