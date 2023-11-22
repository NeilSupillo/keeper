import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios, { HttpStatusCode } from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [main, setMain] = useState([]);
  const [editNotes, setEditNotes] = useState({
    title: "",
    content: "",
  });

  function getBooks() {
    axios
      .get("http://localhost:5555/notes")
      .then((response) => {
        data(response.data.data);
        //console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // set data to usestate
  function data(arr) {
    setBooks(arr);
    setMain(arr);
  }
  function editBook(data) {
    setEditNotes(data);
    // setBooks((prevNotes) => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });
  }

  // get data from server
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onAdd={getBooks} toEdit={editNotes} />
      <div className="notes-container">
        {books.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={getBooks}
              onEdit={editBook}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
