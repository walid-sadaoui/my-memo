import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from "react";
import { ReactComponent as Plus } from "../assets/images/plus.svg";
import { Note } from "../models/Note";
import Modal from "./Modal";
import NoteItem from "./NoteItem";

const Notes: FunctionComponent = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [description, setDescription] = useState<string>("");
  const [showModal, setModal] = useState<boolean>(false);

  const deleteNoteTitle = "Delete Note";
  const deleteNoteMessage =
    "Voulez-vous vraiment supprimer la note suivante? Cette action est irréversible :";

  const handleChange = function (event: ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value);
  };

  const addNote = function (event: MouseEvent): void {
    event.preventDefault();
    fetch(`http://localhost:3005/elements`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ description }),
    })
      .then((note) => note.json())
      .then((note) => {
        notes.unshift(note);
        setNotes(notes);
        setDescription("");
      });
  };

  const deleteNote = function (): void {
    setModal(false);
    fetch(`http://localhost:3005/elements/${selectedNote?.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ description }),
    }).then((note) => note.json());
    const newNotes = notes.filter((item) => item.id !== selectedNote?.id);
    console.log("New Notes : " + JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const toggleModal = function (selectedNote: Note): void {
    setSelectedNote(selectedNote);
    setModal(true);
  };

  useEffect(() => {
    fetch(`http://localhost:3005/elements?_sort=id&_order=desc`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((notes) => notes.json())
      .then((notes) => {
        setNotes(notes);
      });
    // return () => {
    //   cleanup;
    // };
  }, []);

  return (
    <section className="flex flex-col flex-1 pb-2">
      <header className="flex pl-8 pr-12 py-2 items-center text-gray-900">
        <h1 className="text-2xl font-medium text-gray-800">Notes</h1>
        <form className="flex items-center ml-auto my-1">
          <input
            type="text"
            name="newElementInput"
            className="mr-2 rounded-lg py-2 px-4 bg-gray-200 placeholder-gray-600"
            placeholder="Description"
            onChange={handleChange}
            value={description}
          />
          <button
            onClick={addNote}
            className="bg-blue-900 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>Add Element</span>
          </button>
        </form>
      </header>
      <ul className="p-4 flex flex-col overflow-y-auto">
        {notes.map((note, index) => {
          return (
            <NoteItem
              key={note.id}
              onDelete={(): void => toggleModal(note)}
              note={note}
            />
          );
        })}
      </ul>
      {showModal ? (
        <Modal
          initialFocus="#modal__button--no"
          onExit={(): void => setModal(false)}
          onNo={(): void => setModal(false)}
          title={deleteNoteTitle}
          onYes={deleteNote}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-800 mt-4">{deleteNoteMessage}</p>
            <p className="text-lg text-gray-800 mt-4">
              "{selectedNote?.description}"
            </p>
          </div>
        </Modal>
      ) : null}
    </section>
  );
};

export default Notes;
