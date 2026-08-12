//require("dotenv").config();
import dotenv from "dotenv";

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
    path: './.env',
}); // Load environment variables from .env file

connectDB() // Call the connectDB function to establish the database connection
.then(() => {
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`app is listening on port ${process.env.PORT || 8000}`);
  })
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1); // Exit the process with an error code
})










//first approach of connecting to mongodb using mongoose.connect() method
/*
import express from "express";
const app = express();

;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (err) => {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    });
    app.listen(process.env.PORT, ()=>{
        console.log(`app is listening on port ${process.env.PORT}`);
    })
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
})();
*/