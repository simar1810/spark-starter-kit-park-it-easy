import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import db from "./api/config/db.js";


import {
  demoScheduler
} from "./api/util/scheduler.js";




const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/app", appClientRoutes);



if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

const currentDate = new Date();

app.get("/", (req, res) => {
  res.json(
    `Hi! I am here to Welcome You! Version --> 0, recent restarted time = ${currentDate}`
  );
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  db();
  console.log(`Server is running on port ${port}`);
});

//********schedulers*********//
demoScheduler()



mongoose.set("strictQuery", true);
