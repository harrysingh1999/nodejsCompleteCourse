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
import { authRouter } from "./routes/authRouter.js";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import multer from "multer";
import { randomUUID } from "crypto";

const app = express();

const mongo_Url = configDotenv()?.parsed?.MONGO_URL;

const MongoDBStore = connectMongoDBSession(session);

// Instantiate your store
const mongoSessionStore = new MongoDBStore({
  uri: mongo_Url,
  collection: "mySessions",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, randomUUID().slice(0,8)+'-'+ file.originalname );
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
  || file.mimetype === 'image/jpeg'
  ){
    cb(null, true);
  }else{
    cb(null, false);
  }
};

const multerOptions = {
  storage, fileFilter
};

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(multer(multerOptions).single('photo'));

app.use(
  session({
    secret: "Airbnb MERN project",
    resave: false,
    saveUninitialized: true,
    store: mongoSessionStore,
  }),
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});

app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public"))); // inside static method, any passed path will become publicly available.......
app.use('/uploads', express.static(path.join(rootDir, "uploads"))); // inside static method, any passed path will become publicly available.......
app.use('/host/uploads', express.static(path.join(rootDir, "uploads")));
app.use('/homes/uploads', express.static(path.join(rootDir, "uploads")));

app.use(notFoundPage);

const PORT = 3001;

try {
  await mongoose.connect(mongo_Url);

  app.listen(PORT, () => {
    console.log("monogo connected");
    console.log(`Server running on address http://localhost:${PORT}`);
  });
} catch (error) {
  console.log("not able to connect to Mongodb via mongoose", error);
}
