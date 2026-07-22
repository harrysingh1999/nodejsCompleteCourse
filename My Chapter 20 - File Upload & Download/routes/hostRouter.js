// Core Module

// External Module
import express from "express";
export const hostRouter = express.Router();

// Local Module
import { getAddHome, getEditHome, getHostHomes, postAddHome, postDeleteHome, postEditHome } from "../controllers/hostController.js";

hostRouter.get("/add-home", getAddHome);
hostRouter.get("/edit-home/:homeId", getEditHome);

hostRouter.post("/add-home", postAddHome);
hostRouter.post("/edit-home", postEditHome);
hostRouter.post("/delete-home/:homeId", postDeleteHome);
hostRouter.get("/host-home-list", getHostHomes);
