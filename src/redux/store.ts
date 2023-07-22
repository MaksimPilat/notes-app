import { configureStore } from "@reduxjs/toolkit";
import notesListReducer from "./slices/noteListSlice";
import noteEditorReducer from "./slices/noteEditorSlice";
//import tagFilterReducer from "./slices/tagFilterSlice";

export const store = configureStore({
  reducer: {
    notesList: notesListReducer,
    noteEditor: noteEditorReducer,
    //tagFilter: tagFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
