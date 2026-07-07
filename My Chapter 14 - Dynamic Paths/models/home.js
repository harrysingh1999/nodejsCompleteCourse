// This is the Model for Home. It is responsible for handling the data and business logic related to homes in the application. The Home class has properties such as houseName, price, location, rating, and photoUrl. 
// It also has methods to add a new home and fetch all registered homes from a JSON file.

import path from 'path';
import fs from 'fs/promises' // using promises fs that is recommended and best approach than sync and simple async...............

import rootDir from '../utils/pathUtil.js';

const homeJSONPath = path.join(rootDir, 'models/data', 'homes.json')

class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

 async addHome() {
    
    let registeredHomes = await Home.fetchAllHomes();

    if(this.id){
      registeredHomes = registeredHomes.map(home => this.id === home.id ? this : home)
    }else {
      this.id = crypto.randomUUID();
      registeredHomes.push(this)
    }
    
    try {
      await fs.writeFile(homeJSONPath, JSON.stringify(registeredHomes))
    } catch (err) {
      console.log('Error in writing file in addHomes function in Home Model:', err);
    }
  }

  static async fetchAllHomes() {
      try {
        const file = await fs.readFile(homeJSONPath)
        return JSON.parse(file);
      } catch (err) {
        console.log('Error in reading file in fetch Homes function in Home Model:', err);
        return [];
      }
  }

  static async findHome(homeId) {
     const registeredHomes = await Home.fetchAllHomes()
     return registeredHomes?.find(home =>  home?.id === homeId
     )
  }

  static async deleteHome(homeId) {
     const registeredHomes = await Home.fetchAllHomes()
     const updatedHomes = registeredHomes.filter(rh => rh.id !== homeId)
     try{
       await fs.writeFile(homeJSONPath, JSON.stringify(updatedHomes))
     }catch (err) {
      console.log('error while deleting home in Home Model', err)
     }
  }

}

export default Home;