import mongoose from "mongoose";

const connectDB = async() => {
  await mongoose
    .connect(`mongodb+srv://manajemeninformatika:QAtOvwimii0eanhT@sever-hmjmi.ka89kiw.mongodb.net/server-hmjmi?retryWrites=true&w=majority`, {
      bufferCommands: false,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
      console.log("Unable to connect to database");
    });
};

export default connectDB;
