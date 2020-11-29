import React, {
  FunctionComponent,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
  useContext,
} from "react";
import classNames from "classnames";
import { ReactComponent as Plus } from "../assets/images/plus.svg";
import { ReactComponent as Exclamation } from "../assets/images/exclamation.svg";
import { Note } from "../models/Note";
import Modal from "./Modal";
import NoteItem from "./NoteItem";
import {
  getNotesByPinned,
  createNote,
  deleteNote,
  updateNote,
} from "../api/notes";
import { AuthContext } from "../AuthContext";

const Notes: FunctionComponent = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [description, setDescription] = useState<string>("");
  const [showModal, setModal] = useState<boolean>(false);
  const [inputFocussed, setInputFocus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const newNoteInput = useRef<HTMLInputElement>(null);
  const { user } = useContext(AuthContext);

  // i18n
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
    if (selectedNote) {
      deleteNote(selectedNote);
      const updatedNotes: Note[] = getNotesByPinned();
      setNotes(updatedNotes);
      setModal(false);
      setSelectedNote(undefined);
    }
  };

  const toggleModal = function (selectedNote: Note): void {
    setSelectedNote(selectedNote);
    setModal(true);
  };

  const pinNote = function (noteToPin: Note): void {
    noteToPin.pinned = !noteToPin.pinned;
    updateNote(noteToPin);
    const updatedNotes: Note[] = getNotesByPinned();
    setNotes(updatedNotes);
  };

  const renderNoteItem: FunctionComponent<Note> = (note: Note) => {
    return (
      <NoteItem
        key={note.id}
        onDelete={(): void => toggleModal(note)}
        note={note}
        onPin={(): void => pinNote(note)}
      />
    );
  };

  const DeleteNoteModal: FunctionComponent = () => {
    console.log("RENDER MODAL");
    return (
      <Modal
        initialFocus="#modal__button--no"
        onExit={(): void => setModal(false)}
        onNo={(): void => setModal(false)}
        title={deleteNoteTitle}
        onYes={(): void => deleteNoteSelected()}
        showModal={showModal}
      >
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-800 mt-4">{deleteNoteMessage}</p>
          <p className="text-lg text-gray-800 mt-4">
            "{selectedNote?.description}"
          </p>
        </div>
      </Modal>
    );
  };

  useEffect(() => {
    newNoteInput.current?.focus();
    const sortedNotes: Note[] = getNotesByPinned();
    setNotes(sortedNotes);
    setLoading(false);
  }, []);

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
            className="mr-2 flex-grow rounded-lg border-2 border-gray-500 py-2 px-4 bg-gray-200 placeholder-gray-700 w-full"
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
      {user?.id ? null : (
        <div className="flex pl-8 items-center">
          <Exclamation className="w-8 h-8 mr-2 text-red-600" />
          <p className="text-red-600">
            Attention vous utilisez la version hors ligne, vous verrez vos notes
            seulement sur votre navigateur actuel, connectez vous pour pouvoir
            sauvegarder vos notes et les consulter partout !{" "}
          </p>
        </div>
      )}
      {loading && <p>Loading ...</p>}
      {notes.length > 0 ? (
        <ul className="p-4 flex flex-col overflow-y-auto">
          {notes.map(renderNoteItem)}
        </ul>
      ) : (
        <p>
          Aucune Note, ajoutez une nouvelle note pour la voir s'afficher ici
        </p>
      )}
      <DeleteNoteModal />
    </section>
  );
};

export default Notes;
