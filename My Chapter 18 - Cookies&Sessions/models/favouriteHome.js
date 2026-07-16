// import { getDB } from "../utils/databaseUtil.js";

import mongoose from "mongoose";

const favouriteSchema = mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true,
    unique: true
  }
})

export default mongoose.model('Favourite', favouriteSchema)