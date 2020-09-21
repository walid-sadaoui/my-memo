import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";
import { ReactComponent as Trash } from "../assets/images/trash.svg";
import { ReactComponent as Pencil } from "../assets/images/pencil.svg";
import { ReactComponent as Check } from "../assets/images/check.svg";
import { Note } from "../models/Note";

interface NoteProps {
  note: Note;
  onDelete: any;
}

const NoteItem: FunctionComponent<NoteProps> = ({ note, onDelete }) => {
  const [editNote, setEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(note.description);

  const handleChange = function (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void {
    setDescription(event.target.value);
  };

  const updateNote = function (event: MouseEvent): void {
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
    <li className="flex items-center px-3 rounded py-1 my-1 mx-4 border-l-4 border-neutral font-medium bg-white text-gray-700">
      {editNote ? (
        <div className="flex items-center w-1/2">
          <textarea
            className="border-2 rounded h-auto p-2 flex-grow"
            onChange={handleChange}
            value={description}
          />
          <button
            onClick={updateNote}
            className="p-2 rounded-full hover:bg-red-100 focus:outline-none"
          >
            <Check className="w-6 h-6 text-success" />
          </button>
        </div>
      ) : (
        <p>{description}</p>
      )}

      <button
        onClick={(): void => {
          setEdit(!editNote);
        }}
        className="ml-auto p-2 rounded-full hover:bg-red-100 focus:outline-none"
      >
        <Pencil className="w-6 h-6" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 rounded-full hover:bg-red-100 focus:outline-none"
      >
        <Trash className="w-6 h-6 text-red-500" />
      </button>
    </li>
  );
};

export default NoteItem;
