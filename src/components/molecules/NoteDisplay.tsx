import React from "react";
import ReactTooltip from "react-tooltip";
import { Note } from "../../models/Note";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

interface NoteDisplayProps {
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onEdit: (event: React.MouseEvent<HTMLElement>) => void;
  note: Note;
}

const NoteDisplay: React.FunctionComponent<NoteDisplayProps> = ({
  onDelete,
  onEdit,
  note,
}) => {
  return (
    <div
      onDoubleClick={onEdit}
      className="flex items-center w-full border-2 pl-2 border-transparent rounded hover:border-gray-100 hover:bg-gray-200"
    >
      <p>{note.description}</p>
      <Button
        data-tip="Editer la note"
        data-for="edit-note"
        onClick={onEdit}
        className="rounded-full ml-2 text-gray-600 hover:text-gray-800"
      >
        <Icon icon="pencilAlt" size="medium" />
        <ReactTooltip id="edit-note" effect="solid" />
      </Button>
      <Button
        onClick={onDelete}
        data-tip="Supprimer la note"
        data-for="delete-note"
        className="ml-auto p-2 rounded-full hover:bg-red-100 text-red-500"
      >
        <Icon icon="trash" size="medium" />
        <ReactTooltip id="delete-note" effect="solid" />
      </Button>
    </div>
  );
};

export default NoteDisplay;
