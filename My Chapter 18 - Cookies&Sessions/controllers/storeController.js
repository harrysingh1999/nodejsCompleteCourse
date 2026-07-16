import { ObjectId } from "mongodb";
import Favourite from "../models/favouriteHome.js";
import Home from "../models/home.js";

export const getIndex = async (req, res, next) => {
  const registeredHomes = await Home.find();
  res.render("store/index", {
    registeredHomes: registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "index",
     isLoggedIn: req.isLoggedIn,
  });
};

export const getHomes = async (req, res, next) => {
  const registeredHomes = await Home.find();

  res.render("store/home-list", {
    registeredHomes: registeredHomes,
    pageTitle: "Homes List",
    currentPage: "Home",
     isLoggedIn: req.isLoggedIn,
  });
};

export const getHomeDetails = async (req, res, next) => {
  const homeId = req?.params?.homeId;

  const home = await Home.findHome(homeId);
  if (!home) {
    console.log("Home not found");
    res.redirect("/homes");
  } else {
    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      currentPage: "Home",
       isLoggedIn: req.isLoggedIn,
    });
  }
};

export const getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
     isLoggedIn: req.isLoggedIn,
  });
};

  export const getFavouriteList = async (req, res, next) => {
    const favouriteHomes = await Favourite.find().populate('houseId'); // Here we used relations feature of Mongoose to get data of one collection from other.............
    const finalFavouriteHomes = favouriteHomes.map(home => home.houseId)
    console.log({ finalFavouriteHomes });
    
    res.render("store/favourite-list", {
      favouriteHomes: finalFavouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
       isLoggedIn: req.isLoggedIn,
    });
  };

export const postAddToFavourite = async (req, res, next) => {
  const homeId = req?.body?.id;
  try {
    const existingFavHouse = await Favourite.findOne({ houseId: homeId });
    if (existingFavHouse) {
      console.log("Already added to Favourites");
      res.redirect("/favourites");
    } else {
      const favouriteHome = new Favourite({ houseId: homeId });
      favouriteHome.save();
      res.redirect("/favourites");
    }
  } catch (err) {
    console.log("Error while addding home to favourites", err);
  }
};

export const postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req?.params?.homeId;
  await Favourite.findOneAndDelete({houseId: homeId });
  res.redirect("/favourites");
};
