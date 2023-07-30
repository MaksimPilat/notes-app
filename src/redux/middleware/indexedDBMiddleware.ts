import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import { RootState } from "../store";
import { updateNote, deleteNote, addNote, Note } from "../slices/noteListSlice";
import {
  updateNoteInIndexedDB,
  deleteNoteFromIndexedDB,
  addNoteToIndexedDB,
} from "@utils/indexedDB";

const indexedDBMiddleware: Middleware<{}, RootState, Dispatch> =
  (store: MiddlewareAPI<Dispatch, RootState>) =>
    (next: Dispatch) =>
      async (action) => {
        const result = next(action);

        switch (action.type) {
          case updateNote.type:
            const state = store.getState();
            const updatedNote: Note | undefined = state.notesList.notes.find(
              (note) => note.id === action.payload.id
            );
            if (updatedNote) await updateNoteInIndexedDB(updatedNote);
            break;

          case deleteNote.type:
            const deletedNoteId = action.payload;
            await deleteNoteFromIndexedDB(deletedNoteId);
            break;

          case addNote.type:
            const newNote = action.payload;
            await addNoteToIndexedDB(newNote);
            break;

          default:
            break;
        }

        return result;
      };

export default indexedDBMiddleware;
