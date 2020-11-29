import React, {
  FunctionComponent,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEvent,
  FormEvent,
} from "react";
import classNames from "classnames";
import { ReactComponent as Trash } from "../assets/images/trash.svg";
import { ReactComponent as PencilAlt } from "../assets/images/pencil-alt.svg";
import { ReactComponent as Check } from "../assets/images/check.svg";
import { ReactComponent as X } from "../assets/images/x.svg";
import { ReactComponent as Flag } from "../assets/images/flag.svg";
import ReactTooltip from "react-tooltip";
import { updateNote } from "../api/notes";
import { Note } from "../models/Note";

interface NoteProps {
  note: Note;
  onDelete: (event: MouseEvent<HTMLButtonElement>) => void;
  onPin: (event: MouseEvent<HTMLButtonElement>) => void;
}

const NoteItem: FunctionComponent<NoteProps> = ({ note, onDelete, onPin }) => {
  const [editNote, setEdit] = useState<boolean>(false);
  const [inputFocussed, setInputFocus] = useState<boolean>(false);
  const [noteSelected, setNote] = useState<Note>(note);
  const [noteDescription, setNoteDescription] = useState<string>(
    note.description
  );
  const noteItemInput = useRef<HTMLInputElement>(null);
  const initialRender = useRef<boolean>(true);

  // a voir utilité du inputfocussed
  useEffect(() => {
    if (noteItemInput.current?.value !== undefined && inputFocussed) {
      noteItemInput.current?.focus();
      noteItemInput.current.setSelectionRange(
        noteItemInput.current.value.length,
        noteItemInput.current.value.length
      );
    }
  }, [inputFocussed]);

  const handleChangeDescriptionInput = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setNoteDescription(event.target.value);
  };

  const updateNoteDescription = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (noteSelected.description !== noteDescription) {
      setNote({ ...noteSelected, description: noteDescription });
    }
    setEdit(false);
    setInputFocus(false);
  };

  const handleKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void {
    // à voir pour mettre le code plutot {
    if (event.key === "Escape") {
      cancelEditNote();
    }
  };

  const cancelEditNote = function (): void {
    if (noteDescription !== noteSelected.description) {
      setNoteDescription(noteSelected.description);
    }
    setEdit(false);
    setInputFocus(false);
  };

  const editSelectedNote = function (): void {
    setEdit(true);
    setInputFocus(true);
    ReactTooltip.hide();
  };
  // creer une fonction à part appelée dans le useeffect
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      updateNote(noteSelected);
    }
  }, [noteSelected]);
  // separe note editable et en lecture
  return (
    <li className="flex items-center justify-between px-3 border-2 border-gray-500 rounded py-1 my-1 mx-4 bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-sm">
      <div className="flex w-full">
        <button
          onClick={onPin}
          data-tip={!note.pinned ? "Epingler la note" : "Retirer l'épingle"}
          data-for="pin-note"
          className={classNames({
            "p-2 rounded-full mr-2": true,
            "hover:bg-gray-100": !note.pinned,
            "hover:bg-red-100": note.pinned,
          })}
        >
          <Flag
            className={classNames({
              "w-6 h-6": true,
              "text-gray-600": !note.pinned,
              "text-red-500": note.pinned,
            })}
          />
          <ReactTooltip id="pin-note" effect="solid" />
        </button>
        {editNote ? (
          <form
            onSubmit={updateNoteDescription}
            className="flex items-center w-full"
          >
            <input
              type="text"
              id={"note-input-" + note.id}
              name="editNoteInput"
              aria-label="Edit Note input"
              ref={noteItemInput}
              onFocus={(): void => {
                noteItemInput.current?.setSelectionRange(
                  noteItemInput.current.value.length,
                  noteItemInput.current.value.length
                );
              }}
              className="border-2 rounded h-auto w-full p-2 flex-grow bg-secondary"
              onChange={handleChangeDescriptionInput}
              onKeyDown={handleKeyDown}
              value={noteDescription}
            />
            <button
              type="button"
              onClick={cancelEditNote}
              data-tip="Annuler"
              data-for="cancel-edit"
              className="p-2 rounded-full hover:bg-red-100"
            >
              <X className="w-6 h-6 text-red-500" />
            </button>
            <ReactTooltip id="cancel-edit" effect="solid" />
            <button
              type="submit"
              data-tip="Valider"
              data-for="update-note"
              className="p-2 rounded-full hover:bg-green-100"
            >
              <Check className="w-6 h-6 text-green-500" />
            </button>
            <ReactTooltip id="update-note" effect="solid" />
          </form>
        ) : (
          <div
            onDoubleClick={editSelectedNote}
            className="flex items-center w-full border-2 pl-2 border-transparent rounded hover:border-gray-100 hover:bg-gray-200"
          >
            <p>{noteDescription}</p>
            <button
              data-tip="Editer la note"
              data-for="edit-note"
              onClick={editSelectedNote}
              className="rounded-full ml-2"
            >
              <PencilAlt className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </button>
            <ReactTooltip id="edit-note" effect="solid" />
            <button
              onClick={onDelete}
              data-tip="Supprimer la note"
              data-for="delete-note"
              className="ml-auto p-2 rounded-full hover:bg-red-100"
            >
              <Trash className="w-6 h-6 text-red-500" />
              <ReactTooltip id="delete-note" effect="solid" />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default NoteItem;
