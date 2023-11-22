import express from "express";
import { Notes } from "./schema.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const notes = await Notes.find({});
    return response.status(200).json({
      data: notes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Route for Save a new Book
router.post("/", async (request, response) => {
  console.log("body " + request.body);
  try {
    if (!request.body.title || !request.body.content) {
      return response.status(400).send({
        message: `Send all required fields: title author. publishYear`,
      });
    }
    const newNote = {
      title: request.body.title,
      content: request.body.content,
    };
    const notes = await Notes.create(newNote);
    console.log(`post method ${notes}`);
    return response.status(201).send(notes);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// route to delete a note
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    console.log(id);
    const result = await Notes.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: `Book not found` });
    }
    return response.status(200).send({ message: `Book deleted successfully` });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// route to update a note
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.title || !request.body.content) {
      return response.status(400).send({
        message: `Send all required fields: title, author, publishYear`,
      });
    }

    const { id } = request.params;
    const result = await Notes.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: `Book not found` });
    }
    console.log(result);

    return response.status(200).send({ message: ` Book updated successfully` });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
export default router;
