import { createSlice } from "@reduxjs/toolkit";

interface TagFilterState {
  tags: string[];
}

const initialState: TagFilterState = {
  tags: [],
};

const tagFilterSlice = createSlice({
  name: "tagFilter",
  initialState: initialState,
  reducers: {},
});

export default tagFilterSlice.reducer;
