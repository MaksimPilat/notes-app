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
  notes: [
    {
      id: "1",
      content:
        "В этом примере, мы создали компонент NotesList, который принимает дочерние элементы (children) в качестве пропсов. Дочерние элементы будут элементами списка заметок. Мы обернули Paper компонент от Material-UI в Box, чтобы добавить внутренние отступы к контейнеру и сделать его более структурированным.",
      tags: ["1"],
    },
    {
      id: "2",
      content:
        "В этом примере, мы создали компонент NotesList, который принимает дочерние элементы (children) в качестве пропсов. Дочерние элементы будут элементами списка заметок.",
      tags: ["2"],
    },
    {
      id: "3",
      content: "В этом примере, мы создали компонент NotesList.",
      tags: ["3"],
    },
  ],
};

const noteListSlice = createSlice({
  name: "noteList",
  initialState: initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<{ content: string; tags: string[] }>
    ) => {
      state.notes.push({ id: uuidv4(), ...action.payload });
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const { id, content, tags } = action.payload;
      const searchNote = state.notes.find((note) => note.id === id);
      if (searchNote) {
        searchNote.content = content;
        searchNote.tags = tags;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = noteListSlice.actions;

export default noteListSlice.reducer;
