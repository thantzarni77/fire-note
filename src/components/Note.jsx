import DeleteButton from "./DeleteButton";

const Note = ({ note, id, getData }) => {
  const deleteHandle = async () => {
    try {
      const response = await fetch(
        `https://fire-note-29ca6-default-rtdb.firebaseio.com/notes/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error deleting note");
      }

      getData();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="card card-ctr">
      <div>- {note}</div>
      <span className="deleteBtn" onClick={deleteHandle}>
        <DeleteButton />
      </span>
    </div>
  );
};

export default Note;
