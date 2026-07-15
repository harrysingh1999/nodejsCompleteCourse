// Core Module
// const path = require('path');
import path from "path";

// External Module
import express from "express";

//Local Module

import rootDir from "./utils/pathUtil.js";
import { notFoundPage } from "./controllers/errorController.js";
import { hostRouter } from "./routes/hostRouter.js";
import { storeRouter } from "./routes/storeRouter.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(notFoundPage);

const PORT = 3001;

const mongo_Url = configDotenv()?.parsed?.MONGO_URL;

try {
  await mongoose.connect(mongo_Url);

  app.listen(PORT, () => {
    console.log('monogo connected')
    console.log(`Server running on address http://localhost:${PORT}`);
  });
} catch (error) {
console.log('not able to connect to Mongodb via mongoose')
}
