import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes = [action.payload, ...state.notes];
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
    setInitialNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
  },
});

export const { addNote, updateNote, deleteNote, setInitialNotes } =
  noteListSlice.actions;

export default noteListSlice.reducer;
