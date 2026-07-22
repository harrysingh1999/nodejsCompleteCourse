// Core Modules
import path from "path";

// External Module
import express from "express";
export const storeRouter = express.Router();

// Local Module
import { getIndex, getHomes,
  getFavouriteList,
  getBookings, getHomeDetails,
  postAddToFavourite,
  postRemoveFromFavourite, 
  getHouseRules} from "../controllers/storeController.js";

storeRouter.get("/", getIndex);
storeRouter.get("/homes", getHomes);
storeRouter.get("/homes/:homeId", getHomeDetails);
storeRouter.get("/houseRules/:homeId", getHouseRules);
storeRouter.get("/favourites", getFavouriteList);
storeRouter.post("/favourites", postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId", postRemoveFromFavourite);

storeRouter.get("/bookings", getBookings);
