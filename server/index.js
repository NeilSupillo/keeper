import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const books = [
  {
    title: "justin",
    content: "why so beautiful",
  },
  { title: "jem", content: "you too!" },
];

app.get("/notes", async (request, response) => {
  try {
    return response.status(200).json({
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.post("/notes", async (request, response) => {
  console.log(request.body);
  try {
    if (!request.body.title || !request.body.content) {
      return response.status(400).send({
        message: `Send all required fields: title author. publishYear`,
      });
    }
    const newBook = {
      title: request.body.title,
      content: request.body.content,
    };
    books.push(newBook);
    return response.status(201).send(books);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`app is listening to port: ${PORT}`);
});
