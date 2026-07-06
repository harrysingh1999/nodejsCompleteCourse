// This is the Model for Home. It is responsible for handling the data and business logic related to homes in the application. The Home class has properties such as houseName, price, location, rating, and photoUrl. 
// It also has methods to add a new home and fetch all registered homes from a JSON file.

import path from 'path';
import fs from 'fs/promises' // using promises fs that is recommended and best approach than sync and simple async...............

import rootDir from '../utils/pathUtil.js';

class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  async addHome() {
    const filePath = path.join(rootDir, 'models/data', 'homes.json')
    
    let registeredHomes = Home.fetchAllHomes();

      try {
        let fileData = await fs.readFile(filePath)
        registeredHomes = JSON.parse(fileData);
      } catch (err) {
        console.log('Error in reading file data in addHomes function in Home Model:', err);
        registeredHomes = []
      }

    console.log('Registered Homes in addHome:', registeredHomes);
    const finalData = [...registeredHomes, this]

    try {
      await fs.writeFile(filePath, JSON.stringify(finalData))
    } catch (err) {
      console.log('Error in writing file in addHomes function in Home Model:', err);
    }
  }

  static async fetchAllHomes() {
    const dirPath = path.join(rootDir, 'models/data')

      try {
        const file = await fs.readFile(path.join(dirPath, 'homes.json'))
        console.log('uhisa ef parsed file', JSON.parse(file))
        return JSON.parse(file);
      } catch (err) {
        console.log('Error in reading file in fetch Homes function in Home Model:', err);
        return [];
      }
  }
}

export default Home;