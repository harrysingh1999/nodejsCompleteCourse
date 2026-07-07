import Home from '../models/home.js';

export const getAddHome = (req, res, next) => {
  res.render('host/addHome', { pageTitle: 'Add Home to airbnb',
     currentPage: 'addHome' });
}

export const getHostHomes = async (req, res, next) => {
  const registeredHomes = await Home.fetchAllHomes();
  res.render("host/host-home-list", {
    registeredHomes: registeredHomes,
    pageTitle: "Host Homes List",
    currentPage: "host-homes",
  })
};

export const postAddHome = (req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  // registeredHomes.push(req.body);
  const { houseName, price, location, rating, photoUrl } = req.body;
  const newHome = new Home(houseName, price, location, rating, photoUrl);
  newHome.addHome();
  res.render('host/home-added', { pageTitle: 'Home Added Successfully', currentPage: 'homeAdded' });
}