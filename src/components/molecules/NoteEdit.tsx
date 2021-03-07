import React from "react";
import ReactTooltip from "react-tooltip";
import { Note } from "../../models/Note";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Input from "../atoms/Input";

interface NoteEditProps {
  note: Note;
  onUpdate: (noteDescription: string) => void;
  onCancel: (event: React.SyntheticEvent<HTMLElement>) => void;
}

const NoteEdit: React.FunctionComponent<NoteEditProps> = ({
  note,
  onUpdate,
  onCancel,
}) => {
  const [noteDescription, setNoteDescription] = React.useState<string>(
    note.description
  );
  const noteItemInput = React.useRef<HTMLInputElement>(null);

  const handleChangeDescriptionInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNoteDescription(event.target.value);
  };

  const handleKeyDown = function (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key === "Escape") {
      onCancel(event);
    }
    if (event.key === "Enter") {
      updateNoteDescription(event);
    }
  };

  const updateNoteDescription = (
    event: React.SyntheticEvent<HTMLElement>
  ): void => {
    event.preventDefault();
    if (noteDescription.length !== 0 && noteDescription !== note.description) {
      onUpdate(noteDescription);
    }
  };

  React.useEffect(() => {
    if (noteItemInput.current?.value !== undefined) {
      noteItemInput.current?.focus();
    }
  }, []);

  return (
    <form onSubmit={updateNoteDescription} className="flex items-center w-full">
      <Input
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
      <Button
        type="button"
        onClick={onCancel}
        data-tip="Annuler"
        data-for="cancel-edit"
        className="p-2 rounded-full text-red-500 hover:bg-red-100"
      >
        <Icon icon="x" size="medium" />
      </Button>
      <ReactTooltip id="cancel-edit" effect="solid" />
      <Button
        type="submit"
        data-tip="Valider"
        data-for="update-note"
        className="p-2 rounded-full text-green-500 hover:bg-green-100"
      >
        <Icon icon="check" size="medium" />
      </Button>
      <ReactTooltip id="update-note" effect="solid" />
    </form>
  );
};

export default NoteEdit;
