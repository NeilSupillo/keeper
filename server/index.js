import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Route from "./route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
<<<<<<< HEAD
    origin: ["https://keeper-frontend-sigma.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
=======
    origin: ["https://keeper-frontend-sigma.vercel.app"],
    methods: ["POST", "GET"],
>>>>>>> 97130f6f5b39d75175feb8794ca6f93f7242ba35
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.json("Hello");
});

app.use("/notes", Route);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`App connected to database`);
    app.listen(process.env.PORT, () => {
      console.log(`app is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
