import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NoteEditorState {
  isVisible: boolean;
  content: string;
  tags: string[];
  noteId?: string;
}

const initialState: NoteEditorState = {
  isVisible: false,
  content: "",
  tags: [],
  noteId: "",
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
      const tags = action.payload.match(/#([^#\s]+)/g);
      if (tags) state.tags = Array.from(new Set(tags));
      else state.tags = [];
    },
    setNoteId: (state, action: PayloadAction<string>) => {
      state.noteId = action.payload;
    },
  },
});

export const { toggleNoteEditorVisibility, changeNoteEditorContent, setNoteId } = noteEditorSlice.actions;

export default noteEditorSlice.reducer;
