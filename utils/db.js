import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(`mongodb+srv://manajemeninformatika:QAtOvwimii0eanhT@sever-hmjmi.ka89kiw.mongodb.net/server-hmjmi?retryWrites=true&w=majority`)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
      console.log("Unable to connect to database");
    });
};

export default connectDB;
