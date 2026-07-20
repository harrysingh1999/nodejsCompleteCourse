import mongoose from "mongoose";
// import favouriteHome from "./favouriteHome.js";

const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photoUrl: String,
  description: String,
});

// this is pre hook of Mongoose, it runs before primary operations, that means home from favourites will be deleted first then home will be deleted from home Document ........................
// homeSchema.pre('findOneAndDelete', async function(next) {
//   const homeId = this.getQuery()._id
//   console.log('homeid in  prehook', homeId)
//   await favouriteHome.deleteMany({houseId: homeId })
// } )

export default mongoose.model('Home', homeSchema);