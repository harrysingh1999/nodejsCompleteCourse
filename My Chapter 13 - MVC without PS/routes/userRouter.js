// Core Modules
import path from "path";

// External Module
import express from "express";
import { getHomes } from "../controllers/homeController.js";
export const userRouter = express.Router();

// Local Module
// const { registeredHomes } = require('./hostRouter');

userRouter.get("/", getHomes);

