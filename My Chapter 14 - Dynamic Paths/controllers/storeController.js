import Favourite from '../models/favouriteHome.js';
import Home from '../models/home.js'
 
export const getIndex = async (req, res, next) => {
  const registeredHomes = await Home.fetchAllHomes();
  res.render("store/index", {registeredHomes: registeredHomes,
     pageTitle: 'airbnb Home', 
     currentPage: 'index'});
}

export const getHomes = async (req, res, next) => {
  const registeredHomes = await Home.fetchAllHomes();

    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
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
      });
    }
};

export const getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

export const getFavouriteList = async (req, res, next) => {
  const favouriteHomes = await Favourite.fetchAllFavouriteHomes()
   const registeredHomes = await Home.fetchAllHomes()
     const filteredFavouriteHomes = favouriteHomes?.flatMap(pd => {
        return registeredHomes.filter(rh => rh.id === pd)
     })
    res.render("store/favourite-list", {
      favouriteHomes: filteredFavouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    })
};

export const postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id)
  res.redirect('/favourites')
}

export const postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteFavouriteHome(homeId);
  res.redirect("/favourites");
}