import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Route from "./route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://keeper-frontend-sigma.vercel.app"],
    methods: ["POST", "GET"],
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
