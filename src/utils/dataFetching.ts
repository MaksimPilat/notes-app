import { getNotesFromIndexedDB } from "./indexedDB";
import { setInitialNotes } from "../redux/slices/noteListSlice";
import { Dispatch } from "redux";

export const fetchNotesFromDB = async (dispatch: Dispatch) => {
  try {
    const notesFromIndexedDB = await getNotesFromIndexedDB();
    dispatch(setInitialNotes(notesFromIndexedDB));
  } catch (error) {
    console.error("Error fetching notes from IndexedDB:", error);
  }
};
