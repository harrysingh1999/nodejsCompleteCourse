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

export const getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

export const getFavouriteList = async (req, res, next) => {
  const registeredHomes = await Home.fetchAllHomes();

    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
    })
};
