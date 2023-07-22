import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TagFilterState {
  isVisible: boolean;
  tags: string[];
}

const initialState: TagFilterState = {
  isVisible: false,
  tags: [],
};

const tagFilterSlice = createSlice({
  name: "tagFilter",
  initialState: initialState,
  reducers: {
    toggleNoteEditorVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    changeTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
  },
});

export default tagFilterSlice.reducer;
