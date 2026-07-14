import { ObjectId } from "mongodb";
import { getDB } from "../utils/databaseUtil.js";

class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  async addHome() {
    const db = getDB();
    if (this._id) {
      const updatedFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      };
      return db.collection("homes").updateOne(
        {
          _id: new ObjectId(String(this._id)),
        },
        { $set: updatedFields },
      );
    } else {
      return db.collection("homes").insertOne(this);
    }
  }

  static async fetchAllHomes() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static async findHome(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static async deleteHome(homeId) {}
}

export default Home;
