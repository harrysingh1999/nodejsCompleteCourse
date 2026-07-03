// Core Module
import path from "path";

// External Module
import express from "express";
export const hostRouter = express.Router();

// Local Module
import rootDir from "../utils/pathUtil.js";
import { getAddHome, postAddHome } from "../controllers/homeController.js";

hostRouter.get("/add-home", getAddHome)

hostRouter.post("/add-home", postAddHome)

