import express from "express";
import mongoose from "mongoose";
//import dotenv from 'dotenv';
import roomsRoute from "./routes/roomsRoute.js";
// import usersRoute from "./routes/usersRoute.js";
import cors from "cors";
import bookingRoute from "./routes/bookingRoute.js";
//import postRouter from "./routing/post-routes";

// const express = require('express')
// const mongoose = require('mongoose');
//const roomsRoute = require('../routes/roomsRoute')

const app = express();

//middleware
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello world 3");
});
app.use(express.json());
app.use("/api/rooms", roomsRoute);
// app.use("/api/users", usersRoute);
app.use("/api/booking", bookingRoute);
//app.use('/api/rooms' , roomsRoute)

//connection
// const connectDB = require('./db')
// connectDB()
//mongodb direct connection
mongoose
  .connect(
    "mongodb+srv://Vidisha:vidisha@cluster0.mgwgzxk.mongodb.net/hospital-rooms?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to mongo Successful"))
  .catch((err) => console.log(console.log(err)));

const port = 5000;

app.listen(port, () => console.log("Node Server Started"));