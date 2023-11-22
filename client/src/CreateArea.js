import React, { useState } from "react";
import axios, { HttpStatusCode } from "axios";

function CreateArea(props) {
  const [bol, setbol] = useState(true);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  if (props.toEdit.content && bol === true) {
    console.log(props.toEdit.content, props.toEdit.title);
    setNote({
      title: props.toEdit.title,
      content: props.toEdit.content,
    });
    setbol(false);
  }

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
    // console.log(note);
    axios
      .post("https://keeper-alpha.vercel.app/notes", note)
      .then(() => {
        props.onAdd();
        setNote({
          title: "",
          content: "",
        });
        setbol(true);
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
