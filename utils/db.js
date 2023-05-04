import mongoose from "mongoose";
import config from "../config/index.js";

const connectDB = async () => {
  const { host, dbPort, dbName } = config;

  try {
    await mongoose.connect(`mongodb://${host}:${dbPort}/${dbName}`);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    console.log("Unable to connect to database");
  }
};

export default connectDB;
