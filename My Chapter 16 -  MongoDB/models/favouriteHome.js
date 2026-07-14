import { getDB } from "../utils/databaseUtil.js";


class Favourite {
  
  static async addToFavourite(homeId) {
    const db = getDB();
    console.log(this, 'this')
    const ExistingFav = await db.collection('favouriteHomes').findOne({homeId: homeId})
    console.log('sefw', ExistingFav)
    return ExistingFav ? console.log('favourite house already added') : db.collection('favouriteHomes').insertOne({homeId})
  }
  
  static async fetchAllFavouriteHomes() {
    const db = getDB();
    return db.collection('favouriteHomes').find().toArray()
    
  }
  
  static async deleteFavouriteHome(homeId) {
    const db = getDB();
   return db.collection('favouriteHomes').deleteOne({homeId})
  }

}



export default Favourite;