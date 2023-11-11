import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios, { HttpStatusCode } from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [main, setMain] = useState([]);
  const [notes, setNotes] = useState([]);

  function getBooks() {
    axios
      .get("http://localhost:5555/notes")
      .then((response) => {
        data(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteNote(id) {
    setBooks((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function data(arr) {
    setBooks(arr);
    setMain(arr);
  }
  // get data from server
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onAdd={getBooks} />
      <div className="notes-container">
        {books.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
