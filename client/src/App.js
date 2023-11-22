import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
//import { get } from "mongoose";

function App() {
  const [books, setBooks] = useState([]);
  const [editNotes, setEditNotes] = useState({
    title: "",
    content: "",
  });

  function getBooks() {
    axios
      .get("https://keeper-alpha.vercel.app/notes")
      .then((response) => {
        data(response.data.data);
        //console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setEditNotes({
      title: "",
      content: "",
    });
  }
  // set data to usestat
  function data(arr) {
    setBooks(arr);
    //onsole.log(arr);
  }
  function editBook() {
    getBooks();
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
              id={noteItem._id}
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
