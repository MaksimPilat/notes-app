import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notesListReducer from "./slices/noteListSlice";
import noteEditorReducer from "./slices/noteEditorSlice";
import tagFilterReducer from "./slices/tagFilterSlice";
import indexedDBMiddleware from "./middleware/indexedDBMiddleware";

const rootReducer = combineReducers({
  notesList: notesListReducer,
  noteEditor: noteEditorReducer,
  tagFilter: tagFilterReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(indexedDBMiddleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
