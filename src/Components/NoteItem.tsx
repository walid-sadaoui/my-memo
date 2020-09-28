import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import { ReactComponent as Trash } from "../assets/images/trash.svg";
import { ReactComponent as Pencil } from "../assets/images/pencil.svg";
import { ReactComponent as Check } from "../assets/images/check.svg";
import { ReactComponent as X } from "../assets/images/x.svg";
import { ReactComponent as Bookmark } from "../assets/images/bookmark.svg";
import { Note } from "../models/Note";

interface NoteProps {
  note: Note;
  onDelete: (event: MouseEvent<HTMLButtonElement>) => void;
}

const NoteItem: FunctionComponent<NoteProps> = ({ note, onDelete }) => {
  const [editNote, setEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(note.description);

  const handleChange = function (event: ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value);
  };

  const updateNote = function (event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if (note.description !== description) {
      fetch(`http://localhost:3005/elements/${note.id}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ description }),
      });
    }
    setEdit(false);
  };

  return (
    <li className="flex items-center justify-between px-3 rounded py-1 my-1 mx-4 bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-sm">
      <div className="flex w-full">
        <button
          onClick={updateNote}
          className="p-2 rounded-full hover:bg-gray-100 mr-2"
        >
          <Bookmark className="w-6 h-6 text-gray-600" />
        </button>
        {editNote ? (
          <div className="flex items-center w-full">
            <input
              id={"note-input-" + note.id}
              className="border-2 rounded h-auto w-full p-2 flex-grow bg-secondary"
              onChange={handleChange}
              value={description}
            />
            <button
              onClick={updateNote}
              className="p-2 rounded-full hover:bg-red-100"
            >
              <X className="w-6 h-6 text-red-500" />
            </button>
            <button
              onClick={updateNote}
              className="p-2 rounded-full hover:bg-green-100"
            >
              <Check className="w-6 h-6 text-green-500" />
            </button>
          </div>
        ) : (
          <div
            onDoubleClick={(): void => {
              setEdit(!editNote);
            }}
            className="flex w-full border-2 p-2 border-transparent rounded hover:border-gray-100 hover:bg-gray-200"
          >
            <p>{description}</p>
            <button
              onClick={(): void => {
                setEdit(!editNote);
              }}
              className="rounded-full ml-2"
            >
              <Pencil className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </button>
          </div>
        )}
      </div>
      <button
        onClick={onDelete}
        className="ml-auto p-2 rounded-full hover:bg-red-100"
      >
        <Trash className="w-6 h-6 text-red-500" />
      </button>
    </li>
  );
};

export default NoteItem;
