// Core Modules
import path from "path";

// External Module
import express from "express";
export const storeRouter = express.Router();

// Local Module
import { getIndex, getHomes, getFavouriteList, getBookings } from "../controllers/storeController.js";
// const { registeredHomes } = require('./hostRouter');

storeRouter.get("/", getIndex);
storeRouter.get("/homes", getHomes);
storeRouter.get("/favourites", getFavouriteList);
storeRouter.get("/bookings", getBookings);

