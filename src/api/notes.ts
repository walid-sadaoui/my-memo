import { Note } from "../models/Note";

const NOTES_KEY = "notes";

export const createNote = (description: string): Note[] => {
  const notes: Note[] = getNotesById();
  notes.reverse();
  const newNoteId: number = notes.length > 0 ? notes[0].id + 1 : 1;
  const newNote: Note = {
    id: newNoteId,
    description: description,
    pinned: false,
  };
  notes.push(newNote);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return notes;
};

export const getNotes = (): Note[] => {
  let notes: Note[] = [];
  notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  return notes;
};

export const getNotesByPinned = (): Note[] => {
  const notesToSort: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
  notesToSort.sort((note2, note1) => {
    if (note1.id > note2.id && note1.pinned === note2.pinned) {
      return 1;
    }
    if (note1.id < note2.id && note1.pinned === note2.pinned) {
      return -1;
    }
    if (note1.pinned === true) {
      return 1;
    } else {
      return -1;
    }
  });
  return notesToSort;
};

export const getNotesById = (): Note[] => {
  let notes: Note[] = [];
  notes = JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  notes.sort((note2, note1) => {
    if (note1.id > note2.id) {
      return -1;
    } else {
      return 1;
    }
  });
  return notes;
};

export const deleteNote = (noteToDelete: Note): Note[] => {
  let updatedNotes: Note[] = getNotes();
  updatedNotes = updatedNotes.filter(
    (noteItem) => noteItem.id !== noteToDelete?.id
  );
  localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  return updatedNotes;
};

export const updateNote = (noteToUpdate: Note): Note[] => {
  const notes: Note[] = getNotes();
  const noteIndex: number = notes.findIndex((note) => {
    return note.id === noteToUpdate.id;
  });
  notes[noteIndex] = noteToUpdate;
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return notes;
};
