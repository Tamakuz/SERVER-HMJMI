import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import compression from "compression";
import connectDB from "./utils/db.js";
import listener from "./bin/index.js";
import corsConfig from "./utils/cors.js";
import routes from "./apis/routes.js";
import firebaseConnect from "./firebase/index.js";
import mongoose from "mongoose";

//* Setup config procces
dotenv.config();

//* Firebase storage connect
firebaseConnect();

const app = express();

//* Setup MD Cors
corsConfig({ app });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression())

//* Setup routes
app.use("/api", routes);
app.use("/", (req, res) => {
  res.send("Welcome");
});

//* setup error response
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//* Concect to DB
mongoose
  .connect(
    "mongodb+srv://manajemeninformatika:QAtOvwimii0eanhT@sever-hmjmi.ka89kiw.mongodb.net/server-hmjmi?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log({ error });
    process.exit(1);
  });

//* Runner a Server
listener({ app });
