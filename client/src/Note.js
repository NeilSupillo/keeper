import React from "react";
import axios from "axios";

function Note(props) {
  const handleDeleteBook = () => {
    axios
      .delete(`http://localhost:5555/notes/${props.id}`)
      .then(() => {
        props.onDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditBook = () => {
    props.onEdit({ title: props.title, content: props.content });
    // axios
    //   .delete(`http://localhost:5555/notes/${props.id}`)
    //   .then(() => {
    //     props.onDelete();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDeleteBook}>Delete</button>
      <button onClick={handleEditBook}>Edit</button>
    </div>
  );
}

export default Note;
