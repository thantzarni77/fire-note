import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AddNoteForm from "./components/AddNoteForm";
import Note from "./components/Note";
import Intro from "./components/Intro";

const App = () => {
  const [notesData, setNotesData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://fire-note-29ca6-default-rtdb.firebaseio.com/notes.json"
      );

      if (!response.ok) {
        throw new Error("No data can be fetched from server");
      }
      const notes = await response.json();

      let modifiedNotes = [];

      for (let key in notes) {
        modifiedNotes.push({
          id: key,
          text: notes[key],
        });
      }

      setNotesData(modifiedNotes);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar count={notesData?.length} />
      {isLoading && !error && (
        <div className="loading">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
          <div>Getting Notes</div>
        </div>
      )}
      {error && !isLoading && <div className="loading error">{error}</div>}
      {!isLoading && !error && (
        <>
          <AddNoteForm getData={getData} />
          {notesData?.map((note) => {
            return (
              <Note
                key={note.id}
                note={note.text}
                id={note.id}
                getData={getData}
              />
            );
          })}
        </>
      )}
      {notesData?.length === 0 && <Intro />}
    </div>
  );
};

export default App;
