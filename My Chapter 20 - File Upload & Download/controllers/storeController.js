import Home from "../models/home.js";
import User from "../models/user.js";
import rootDir from "../utils/pathUtil.js";
import path from "path";

export const getIndex = async (req, res) => {
  const registeredHomes = await Home.find();

  res.render("store/index", {
    registeredHomes: registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "index",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

export const getHomes = async (req, res) => {
  const registeredHomes = await Home.find();

  res.render("store/home-list", {
    registeredHomes: registeredHomes,
    pageTitle: "Homes List",
    currentPage: "Home",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

export const getHomeDetails = async (req, res) => {
  const homeId = req?.params?.homeId;

  const home = await Home.findById(homeId);

  if (!home) {
    res.redirect("/homes");
  } else {
    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  }
};

export const getHouseRules = [
  (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return res.redirect("/login");
    }
    next();
  },

  (req, res) => {
    const houseRuleId = req?.params?.homeId;

    const filePath = path.join(rootDir, "houseRules", `${houseRuleId}.pdf`);

    res.download(filePath, "houseRules.pdf", (err) => {
      if (err) {
        // Handle error (e.g., file not found)
        res.status(404).send("File not found");
      }
    });
  },
];

export const getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

export const getFavouriteList = async (req, res) => {
  const userId = req.session.user._id;

  const favouriteHomes = await User.findById(userId).populate("favourites");

  res.render("store/favourite-list", {
    favouriteHomes: favouriteHomes?.favourites,
    pageTitle: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

export const postAddToFavourite = async (req, res) => {
  const homeId = req?.body?.id;

  const userId = req.session.user._id;

  try {
    const user = await User.findById(userId);

    if (!user.favourites.includes(homeId)) {
      user.favourites.push(homeId);
      await user.save();
    }
    res.redirect("/favourites");
  } catch (err) {
    console.log("error while adding Favourties", err);
  }
};

export const postRemoveFromFavourite = async (req, res) => {
  const homeId = req?.params?.homeId;

  const userId = req.session.user._id;

  try {
    const user = await User.findById(userId);

    if (user.favourites.includes(homeId)) {
      user.favourites = user.favourites.filter(
        (fav) => fav.toString() !== homeId,
      );
      await user.save();
    }
    res.redirect("/favourites");
  } catch (err) {
    console.log("error while deleting Favourties", err);
  }
};
