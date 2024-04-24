import React from "react";
import classNames from "classnames";
import { Note } from "../../models/Note";
import Modal from "../organisms/Modal";
// import Warning from "../molecules/Warning";
import Loading from "../molecules/Loading";
import NoteItem from "../molecules/NoteItem";
import {
  getNotesByPinned,
  createNote,
  deleteNote,
  updateNote,
} from "../../api/notes";
// import { useAuth } from "../../AuthContext";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Input from "../atoms/Input";

const Notes: React.FunctionComponent = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = React.useState<Note | undefined>();
  const [description, setDescription] = React.useState<string>("");
  const [showModal, setModal] = React.useState<boolean>(false);
  const [inputFocussed, setInputFocus] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const newNoteInput = React.useRef<HTMLInputElement>(null);
  // const { user } = useAuth();

  // const USER_OFFLINE_MESSAGE =
  //   "Attention vous utilisez la version hors ligne, vous verrez vos notes seulement sur votre navigateur actuel, connectez-vous pour pouvoir sauvegarder vos notes et les consulter partout !";
  const deleteNoteTitle = "Delete Note";
  const deleteNoteMessage =
    "Voulez-vous vraiment supprimer la note suivante? Cette action est irréversible :";

  const formClass = classNames({
    "flex flex-col sm:flex-row items-center my-1": true,
    "sm:ml-8 w-full": inputFocussed,
    "sm:ml-auto w-full sm:w-auto": !inputFocussed,
  });

  const handleChange = function (
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setDescription(event.target.value);
  };

  const addNote = function (event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (description.length > 0) {
      createNote(description);
      setNotes(getNotesByPinned());
      setDescription("");
    }
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

  const renderNoteItem: React.FunctionComponent<Note> = (note: Note) => {
    return (
      <NoteItem
        key={note.id}
        onDelete={(): void => toggleModal(note)}
        note={note}
        onPin={(): void => pinNote(note)}
      />
    );
  };

  const DeleteNoteModal: React.FunctionComponent = () => {
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
          <p className="mt-4 text-sm text-gray-800">{deleteNoteMessage}</p>
          <p className="mt-4 text-lg text-gray-800">
            "{selectedNote?.description}"
          </p>
        </div>
      </Modal>
    );
  };

  React.useEffect(() => {
    newNoteInput.current?.focus();
    const sortedNotes: Note[] = getNotesByPinned();
    setNotes(sortedNotes);
    setLoading(false);
  }, []);

  return (
    <section className="flex flex-col flex-1">
      {/* {!user && <Warning message={USER_OFFLINE_MESSAGE} />} */}
      <header className="flex flex-col items-center px-4 py-4 text-gray-900 sm:flex-row">
        <h1 className="text-5xl font-medium text-gray-800 font-hand">Notes</h1>
        <form onSubmit={addNote} className={formClass}>
          <Input
            type="text"
            name="newNoteInput"
            aria-label="New Note input"
            ref={newNoteInput}
            className="flex-grow w-full px-4 py-2 placeholder-gray-700 bg-gray-200 border-2 border-gray-500 rounded-lg sm:mr-2"
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
          <Button className="items-center hidden text-white bg-blue-900 sm:inline-flex hover:bg-blue-800">
            <Icon icon="plus" size="small" />
            <span className="ml-2">Note</span>
          </Button>
        </form>
      </header>

      {loading && <Loading />}

      {notes.length > 0 ? (
        <ul className="flex flex-col p-4">{notes.map(renderNoteItem)}</ul>
      ) : (
        <p className="m-auto">
          Aucune Note, créez une nouvelle note pour la voir s'afficher ici
        </p>
      )}

      <DeleteNoteModal />
    </section>
  );
};

export default Notes;
