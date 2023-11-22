import mongoose from "mongoose";

const notesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export const Notes = mongoose.model("Note", notesSchema);
