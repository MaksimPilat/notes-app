import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TagFilterState {
  isVisible: boolean;
  tags: string[];
  selectedTags: string[];
}

const initialState: TagFilterState = {
  isVisible: false,
  tags: [],
  selectedTags: [],
};

const tagFilterSlice = createSlice({
  name: "tagFilter",
  initialState: initialState,
  reducers: {
    toggleTagFilterVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    changeTagFilterTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
      state.selectedTags = state.selectedTags.filter((tag) => state.tags.includes(tag));
    },
    changeTagFilterSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
  },
});

export const { toggleTagFilterVisibility, changeTagFilterTags, changeTagFilterSelectedTags } = tagFilterSlice.actions;

export default tagFilterSlice.reducer;
