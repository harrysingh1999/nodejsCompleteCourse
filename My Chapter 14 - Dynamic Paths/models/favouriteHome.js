// This is the Model for Home. It is responsible for handling the data and business logic related to homes in the application. The Home class has properties such as houseName, price, location, rating, and photoUrl. 
// It also has methods to add a new home and fetch all registered homes from a JSON file.

import path from 'path';
import fs from 'fs/promises' // using promises fs that is recommended and best approach than sync and simple async...............

import rootDir from '../utils/pathUtil.js';
import Home from './home.js';

const favouriteHomesPath = path.join(rootDir, 'models/data', 'favourites.json')

class Favourite {


  static async addToFavourite(homeId) {
    let favouriteHomes = await Favourite.fetchAllFavouriteHomes();
    const finalData = favouriteHomes?.includes(homeId) ? favouriteHomes : [...favouriteHomes, homeId]

    try {
      await fs.writeFile(favouriteHomesPath, JSON.stringify(finalData))
    } catch (err) {
      console.log('Error in writing file in addHomes function in Home Model:', err);
    }
  }

  static async fetchAllFavouriteHomes() {

    try {
      const file = await fs.readFile(favouriteHomesPath)
      const parsedData =  JSON.parse(file)
     
      return parsedData;
    } catch (err) {
      console.log('Error in reading file in fetch Homes function in Home Model:', err);
      return [];
    }
  }

}



export default Favourite;