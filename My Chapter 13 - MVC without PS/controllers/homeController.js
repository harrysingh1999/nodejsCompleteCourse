import Home from '../models/home.js'
// import registeredHome from 


export const getHomes = async (req, res, next) => {
  const registeredHomes = await Home.fetchAllHomes();
  console.log('registered Homes in home controller..........', registeredHomes);
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currentPage: 'Home'});
}

export const getAddHome = (req, res, next) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb', currentPage: 'addHome'});
}

export const postAddHome = (req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  // registeredHomes.push(req.body);
  const {houseName, price, location, rating, photoUrl} = req.body;
  const newHome = new Home(houseName, price, location, rating, photoUrl);
  newHome.addHome();
  res.render('homeAdded', {pageTitle: 'Home Added Successfully', currentPage: 'homeAdded'});
}