import Home from '../models/home.js';

export const getAddHome = (req, res, next) => {
  res.render('host/edit-home', { pageTitle: 'Add Home to airbnb',
     currentPage: 'addHome',
    editing: false,
    });
}

export const getEditHome = async (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  const home = await Home.findHome(homeId)
  console.log('homes', home)

  if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
   }

  res.render('host/edit-home', { 
    home: home,
    pageTitle: 'Edit your Home',
    currentPage: 'host-homes',
    editing: editing
    });
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
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  const newHome = new Home(houseName, price, location, rating, photoUrl, description);
  newHome.addHome();
  res.redirect('/host/host-home-list')
}

export const postEditHome = async (req, res, next) => {
  // registeredHomes.push(req.body);
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;
  const newHome = new Home(houseName, price, location, rating, photoUrl, description, id);
  newHome.addHome();
  res.redirect('/host/host-home-list')
}

export const postDeleteHome = (req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  const { homeId } = req.params;
  Home.deleteHome(homeId)
  res.redirect('/host/host-home-list')
}