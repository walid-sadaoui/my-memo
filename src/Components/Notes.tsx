import React, {
  FunctionComponent,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import classNames from "classnames";
import { ReactComponent as Plus } from "../assets/images/plus.svg";
import { Note } from "../models/Note";
import Modal from "./Modal";
import NoteItem from "./NoteItem";
import {
  getNotesByPinned,
  createNote,
  deleteNote,
  updateNote,
} from "../api/notes";

const Notes: FunctionComponent = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [description, setDescription] = useState<string>("");
  const [showModal, setModal] = useState<boolean>(false);
  const [inputFocussed, setInputFocus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const newNoteInput = useRef<HTMLInputElement>(null);

  const deleteNoteTitle = "Delete Note";
  const deleteNoteMessage =
    "Voulez-vous vraiment supprimer la note suivante? Cette action est irréversible :";

  const handleChange = function (event: ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value);
  };

  const addNote = function (event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    createNote(description);
    setNotes(getNotesByPinned());
    setDescription("");
  };

  const deleteNoteSelected = function (): void {
    setModal(false);
    if (selectedNote) {
      deleteNote(selectedNote);
      const updatedNotes: Note[] = getNotesByPinned();
      setNotes(updatedNotes);
    }
  };

  const toggleModal = function (selectedNote: Note): void {
    setSelectedNote(selectedNote);
    setModal(true);
  };

  useEffect(() => {
    newNoteInput.current?.focus();
    const sortedNotes: Note[] = getNotesByPinned();
    setNotes(sortedNotes);
    setLoading(false);
  }, []);

  const pinNote = function (noteToPin: Note): void {
    noteToPin.pinned = !noteToPin.pinned;
    updateNote(noteToPin);
    const updatedNotes: Note[] = getNotesByPinned();
    setNotes(updatedNotes);
  };

  const getNoteItem: FunctionComponent<Note> = (note: Note) => {
    return (
      <NoteItem
        key={note.id}
        onDelete={(): void => toggleModal(note)}
        note={note}
        onPin={(): void => pinNote(note)}
      />
    );
  };

  return (
    <section className="flex flex-col flex-1 pb-2">
      <header className="flex pl-8 pr-12 py-2 items-center text-gray-900">
        <h1 className="text-5xl font-medium font-hand text-gray-800">Notes</h1>
        <form
          onSubmit={addNote}
          className={classNames({
            "flex items-center my-1": true,
            "ml-8 w-full": inputFocussed,
            "ml-auto": !inputFocussed,
          })}
        >
          <input
            type="text"
            name="newNoteInput"
            aria-label="New Note input"
            ref={newNoteInput}
            className="mr-2 flex-grow rounded-lg py-2 px-4 bg-gray-200 placeholder-gray-700 w-full"
            placeholder="Nouvelle note ..."
            onChange={handleChange}
            onFocus={(): void => {
              setInputFocus(true);
              newNoteInput.current?.setSelectionRange(
                newNoteInput.current.value.length,
                newNoteInput.current.value.length
              );
            }}
            onBlur={(): void => setInputFocus(false)}
            value={description}
          />
          <button className="bg-blue-900 text-white py-2 px-4 rounded inline-flex items-center hover:bg-blue-800">
            <Plus className="w-4 h-4 mr-2" />
            <span>Note</span>
          </button>
        </form>
      </header>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <ul className="p-4 flex flex-col overflow-y-auto">
          {Array.isArray(notes) ? (
            notes.length > 0 ? (
              notes.map((note) => {
                return getNoteItem(note);
              })
            ) : (
              <p>
                Aucune Note, ajoutez une nouvelle note pour la voir s'afficher
                ici
              </p>
            )
          ) : null}
        </ul>
      )}
      {showModal ? (
        <Modal
          initialFocus="#modal__button--no"
          onExit={(): void => setModal(false)}
          onNo={(): void => setModal(false)}
          title={deleteNoteTitle}
          onYes={deleteNoteSelected}
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
