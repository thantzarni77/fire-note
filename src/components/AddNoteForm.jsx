import { useState } from "react";

const AddNoteForm = ({ getData }) => {
  const [note, setNote] = useState("");

  const addNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) {
      alert("Please Type Something to add");
      return;
    }
    try {
      await fetch(
        "https://fire-note-29ca6-default-rtdb.firebaseio.com/notes.json",
        {
          method: "POST",
          body: JSON.stringify(note),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNote("");
      getData();
    } catch (err) {
      alert("Something went wrong");
    }
  };
  return (
    <form onSubmit={addNote} className="card">
      <input
        type="text"
        placeholder="Enter Your Note Here"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button className="button addBtn">Add Note</button>
    </form>
  );
};

export default AddNoteForm;
