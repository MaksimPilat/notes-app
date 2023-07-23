import { Note } from "../redux/slices/noteListSlice";

const DB_NAME = "notesDB";
const NOTES_STORE_NAME = "notes";

const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(NOTES_STORE_NAME)) {
        db.createObjectStore(NOTES_STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getNotesFromIndexedDB = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction(NOTES_STORE_NAME, "readonly");
    const store = transaction.objectStore(NOTES_STORE_NAME);
    const request = store.getAll();

    return new Promise<Note[]>((resolve, reject) => {
      request.onsuccess = () => {
        const notes = request.result as Note[];
        resolve(notes);
      };

      request.onerror = () => {
        console.error("Error getting notes from IndexedDB:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error getting notes from IndexedDB:", error);
    return [];
  }
};

export const addNoteToIndexedDB = async (note: Note) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
    const store = transaction.objectStore(NOTES_STORE_NAME);
    store.add(note);
  } catch (error) {
    console.error("Error adding note to IndexedDB:", error);
  }
};

export const updateNoteInIndexedDB = async (note: Note) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
    const store = transaction.objectStore(NOTES_STORE_NAME);
    store.put(note);
  } catch (error) {
    console.error("Error updating note in IndexedDB:", error);
  }
};

export const deleteNoteFromIndexedDB = async (noteId: string) => {
  try {
    const db = await openDB();
    const transaction = db.transaction(NOTES_STORE_NAME, "readwrite");
    const store = transaction.objectStore(NOTES_STORE_NAME);
    store.delete(noteId);
  } catch (error) {
    console.error("Error deleting note from IndexedDB:", error);
  }
};
