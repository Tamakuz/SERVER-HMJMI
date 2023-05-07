import mongoose from "mongoose";

const connectDB = () => {
  mongoose 
    .connect(
      `mongodb+srv://manajemeninformatika:4FusaCyZbDL5ojk0@sever-hmjmi.ka89kiw.mongodb.net/server-hmjmi?retryWrites=true&w=majority&ssl=true`
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
      console.log("Unable to connect to database");
    });
};

export default connectDB;
