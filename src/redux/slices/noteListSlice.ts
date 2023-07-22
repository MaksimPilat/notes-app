import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Note {
  id: string;
  content: string;
  tags: string[];
}

interface NoteListState {
  notes: Note[];
}

const initialState: NoteListState = {
  notes: [],
};

const noteListSlice = createSlice({
  name: "noteList",
  initialState: initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ content: string; tags: string[] }>) => {
      const newNote = { ...action.payload, id: uuidv4() };
      state.notes = [newNote, ...state.notes];
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const { id, content, tags } = action.payload;
      state.notes = state.notes.map((note) => {
        if (note.id === id) {
          return { ...note, content: content, tags: tags };
        }
        return note;
      });
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = noteListSlice.actions;

export default noteListSlice.reducer;
