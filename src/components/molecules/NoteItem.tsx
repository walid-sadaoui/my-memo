import React from "react";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import { updateNote } from "../../api/notes";
import { Note } from "../../models/Note";
import Icon from "../atoms/Icon";
import NoteEdit from "./NoteEdit";
import NoteDisplay from "./NoteDisplay";
import Button from "../atoms/Button";

interface NoteProps {
  note: Note;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onPin: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NoteItem: React.FunctionComponent<NoteProps> = ({
  note,
  onDelete,
  onPin,
}) => {
  const [editNote, setEdit] = React.useState<boolean>(false);
  const [noteSelected, setNote] = React.useState<Note>(note);
  const initialRender = React.useRef<boolean>(true);

  const updateNoteDescription = (noteDescription: string): void => {
    setNote({ ...noteSelected, description: noteDescription });
    setEdit(false);
  };

  const editSelectedNote = function (): void {
    setEdit(true);
    ReactTooltip.hide();
  };

  React.useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      updateNote(noteSelected);
    }
  }, [noteSelected]);

  return (
    <li className="flex items-center justify-between w-full px-3 py-1 my-1 text-gray-800 bg-gray-200 border-2 border-gray-500 rounded hover:bg-gray-300 hover:shadow-sm">
      <Button
        onClick={onPin}
        data-tip={!note.pinned ? "Epingler la note" : "Retirer l'épingle"}
        data-for="pin-note"
        className={classNames({
          "p-2 rounded-full mr-2": true,
          "hover:bg-gray-100 text-gray-600": !note.pinned,
          "hover:bg-red-100 text-red-500": note.pinned,
        })}
      >
        <Icon size="medium" icon="flag" />
        <ReactTooltip id="pin-note" effect="solid" />
      </Button>
      {editNote ? (
        <NoteEdit
          onUpdate={updateNoteDescription}
          onCancel={(): void => setEdit(false)}
          note={noteSelected}
        />
      ) : (
        <NoteDisplay
          onDelete={onDelete}
          onEdit={editSelectedNote}
          note={noteSelected}
        />
      )}
    </li>
  );
};

export default NoteItem;
