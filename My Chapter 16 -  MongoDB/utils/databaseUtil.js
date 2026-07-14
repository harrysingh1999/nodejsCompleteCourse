import dotenv from "dotenv";
import mongodb from "mongodb";
import { configDotenv } from "dotenv";

const mongo_Url =  configDotenv()?.parsed?.MONGO_URL
const mongoConnect = mongodb.MongoClient;

let _db;

export const mongodbConnect = async () => {
  try {
    const client = await mongoConnect.connect(mongo_Url);
    _db = client.db("airbnb");
    return client;
  } catch (error) {
    console.log("error while connecting to Mongodb", error);
  }
};

export const getDB = () => (_db ? _db : console.log("mongodb not connected"));
