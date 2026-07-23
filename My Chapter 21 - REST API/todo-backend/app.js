// Core Module

// External Module
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";

const DB_PATH = configDotenv()?.parsed?.MONGO_URL;

// const DB_PATH = "mongodb+srv://root:root@completecoding.u1asz.mongodb.net/todo?retryWrites=true&w=majority&appName=CompleteCoding";

//Local Module
import { pageNotFound } from "./controllers/errors.js";
import { todoRouter } from "./routes/todoRouter.js";

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoRouter);

app.use(pageNotFound);

const PORT = 3010;

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.error(err);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION");
  console.error(reason);
});

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
