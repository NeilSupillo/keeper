import React, { useState } from "react";
import axios, { HttpStatusCode } from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
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

  const submitNote = () => {
    console.log(note);
    axios
      .post("http://localhost:5555/notes", note)
      .then(() => {
        props.onAdd();
        setNote({
          title: "",
          content: "",
        });
      })
      .catch((error) => {
        //alert(`An error happened. Please Check console`);
        console.log(error);
      });
  };

  return (
    <div>
      <div className="create-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </div>
    </div>
  );
}

export default CreateArea;
