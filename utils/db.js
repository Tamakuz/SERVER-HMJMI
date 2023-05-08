import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(`mongodb://127.0.0.1:27017/server-hmjmi`)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
      console.log("Unable to connect to database");
    });
};

export default connectDB;
