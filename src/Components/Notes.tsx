import React, {
  FunctionComponent,
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
} from "react";
import { ReactComponent as Plus } from "../assets/images/plus.svg";
import { ReactComponent as Trash } from "../assets/images/trash.svg";
import { ReactComponent as Pencil } from "../assets/images/pencil.svg";
import { Note } from "../models/Note";
import Modal from "./Modal";

const Notes: FunctionComponent = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [description, setDescription] = useState<string>("");
  const [showModal, setModal] = useState<boolean>(false);

  const handleChange = function (event: ChangeEvent<HTMLInputElement>): void {
    console.log(event.target.value);
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

  // const deleteNote = function (note: Note): void {
  //   fetch(`http://localhost:3005/elements/${note.id}`, {
  //     method: "DELETE",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //     }),
  //     body: JSON.stringify({ description }),
  //   }).then((note) => note.json());
  //   const newNotes = notes.filter((item) => item.id !== note.id);
  //   console.log("New Notes : " + JSON.stringify(newNotes));
  //   setNotes(newNotes);
  // };

  const toggleModal = function (): void {
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
    <section className="flex flex-col flex-1 font-content pb-2">
      <header className="flex pl-8 pr-12 py-2 items-center text-gray-900">
        <h1 className="text-2xl font-bold">Notes</h1>
        <form className="flex items-center ml-auto my-1">
          <input
            type="text"
            name="newElementInput"
            className="mr-2 rounded-lg py-2 px-4"
            placeholder="Description"
            onChange={handleChange}
            value={description}
          />
          <button
            onClick={addNote}
            className="bg-secondary text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>Add Element</span>
          </button>
        </form>
      </header>
      <ul className="p-4 flex flex-col overflow-y-auto">
        {notes.map((value, index) => {
          return (
            <li
              key={value.id}
              id={"note-" + index}
              className="flex items-center px-3 rounded py-1 my-1 mx-4 border-l-4 border-neutral font-medium bg-white text-gray-700"
            >
              <p>{value.description}</p>
              <button className="ml-auto p-2 rounded-full hover:bg-red-100 focus:outline-none">
                <Pencil className="w-6 h-6" />
              </button>
              <button
                onClick={() => toggleModal()}
                className="p-2 rounded-full hover:bg-red-100 focus:outline-none"
              >
                <Trash className="w-6 h-6 text-red-500" />
              </button>
            </li>
          );
        })}
      </ul>
      {showModal ? (
        <Modal initialFocus="#yes-button" onExit={() => setModal(false)} />
      ) : null}
    </section>
  );
};

export default Notes;
