import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NoteEditorState {
  isVisible: boolean;
  content: string;
  tags: string[];
}

const initialState: NoteEditorState = {
  isVisible: false,
  content: "",
  tags: [],
};

const noteEditorSlice = createSlice({
  name: "noteEditor",
  initialState: initialState,
  reducers: {
    toggleNoteEditorVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    changeNoteEditorContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
});

export const { toggleNoteEditorVisibility, changeNoteEditorContent } = noteEditorSlice.actions;

export default noteEditorSlice.reducer;
