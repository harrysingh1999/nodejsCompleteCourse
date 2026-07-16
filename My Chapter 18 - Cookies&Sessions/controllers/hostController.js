import Home from "../models/home.js";

export const getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
     isLoggedIn: req.isLoggedIn,
  });
};

export const getEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  const home = await Home.findById(homeId);
  console.log("homes", home);

  if (!home) {
    console.log("Home not found for editing.");
    return res.redirect("/host/host-home-list");
  }

  res.render("host/edit-home", {
    home: home,
    pageTitle: "Edit your Home",
    currentPage: "host-homes",
    editing: editing,
     isLoggedIn: req.isLoggedIn,
  });
};

export const getHostHomes = async (req, res, next) => {
  const registeredHomes = await Home.find();
  res.render("host/host-home-list", {
    registeredHomes: registeredHomes,
    pageTitle: "Host Homes List",
    currentPage: "host-homes",
     isLoggedIn: req.isLoggedIn,
  });
};

export const postAddHome = (req, res, next) => {
  console.log("Home Registration successful for:", req.body);
  // registeredHomes.push(req.body);
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const newHome = new Home({
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
});
  newHome.save();
  res.redirect("/host/host-home-list");
};

export const postEditHome = async (req, res, next) => {
  // registeredHomes.push(req.body);
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  const selectedHome = await Home.findById(id)
  
    selectedHome.houseName = houseName,
    selectedHome.price = price,
    selectedHome.location = location,
    selectedHome.rating = rating,
    selectedHome.photoUrl = photoUrl,
    selectedHome.description = description,
  
  selectedHome.save();
  res.redirect("/host/host-home-list");
};

export const postDeleteHome = async (req, res, next) => {
  const { homeId } = req.params;
  await Home.findByIdAndDelete(homeId);
  res.redirect("/host/host-home-list");
};
