import axios from "axios";
import React, { useState } from "react";
import del from "./img/delete.png";
import done from "./img/done.png";
import edit from "./img/edit.png";
import cancel from "./img/cancel.png";

function Note(props) {
  const handleDeleteBook = () => {
    axios
      .delete(`https://keeper-alpha.vercel.app/notes/${props.id}`)
      .then(() => {
        props.onDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveBook = () => {
    axios
      .put(`https://keeper-alpha.vercel.app/notes/${props.id}`, note)
      .then(() => {
        saveOrCancel();
        props.onEdit();
        //console.log(props.title, props.content);
        //console.log(note.title, note.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveOrCancel = () => {
    document.getElementById("h1" + props.id).removeAttribute("hidden");
    document.getElementById("p" + props.id).removeAttribute("hidden");
    document.getElementById("edit" + props.id).removeAttribute("hidden");
    document.getElementById("input" + props.id).setAttribute("hidden", true);
    document.getElementById("cancel" + props.id).setAttribute("hidden", true);
    document.getElementById("done" + props.id).setAttribute("hidden", true);
    document.getElementById("textarea" + props.id).setAttribute("hidden", true);
  };
  const [note, setNote] = useState({
    title: props.title,
    content: props.content,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  function handleEditBook() {
    setNote({
      title: props.title,
      content: props.content,
    });
    document.getElementById("h1" + props.id).setAttribute("hidden", true);
    document.getElementById("p" + props.id).setAttribute("hidden", true);
    document.getElementById("edit" + props.id).setAttribute("hidden", true);
    document.getElementById("input" + props.id).removeAttribute("hidden");
    document.getElementById("done" + props.id).removeAttribute("hidden");
    document.getElementById("textarea" + props.id).removeAttribute("hidden");
    document.getElementById("cancel" + props.id).removeAttribute("hidden");
    //console.log(props.title, props.content);
    //console.log(note.title, note.content);
  }

  return (
    <div className="note">
      <h1 id={"h1" + props.id}>{props.title}</h1>
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        hidden
        value={note.title}
        id={"input" + props.id}
      />
      <p id={"p" + props.id}>{props.content}</p>
      <textarea
        name="content"
        onChange={handleChange}
        placeholder="Take a note..."
        rows="2"
        value={note.content}
        id={"textarea" + props.id}
        hidden
      />
      <button className="note-button" onClick={handleDeleteBook}>
        <img src={del} className="App-logo" alt="logo" />
      </button>
      <button
        className="note-button"
        id={"edit" + props.id}
        onClick={handleEditBook}
      >
        <img src={edit} className="App-logo" alt="logo" />
      </button>
      <button
        hidden
        className="note-button"
        id={"done" + props.id}
        onClick={saveBook}
      >
        <img src={done} className="App-log" alt="logo" />
      </button>
      <button
        hidden
        className="note-button"
        id={"cancel" + props.id}
        onClick={saveOrCancel}
      >
        <img src={cancel} className="App-log" alt="logo" />
      </button>
    </div>
  );
}

// onChange={handleChange}
//           value={note.title}
//           onChange={handleChange}
//           value={note.content}

export default Note;
