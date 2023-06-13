import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import compression from "compression";
import connectDB from "./utils/db.js";
import listener from "./bin/index.js";
import corsConfig from "./utils/cors.js";
import routes from "./apis/routes.js";
import firebaseConnect from "./firebase/index.js";

//* Setup config procces
dotenv.config();

//* Concect to DB
connectDB();

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

//* Runner a Server
listener({ app });
