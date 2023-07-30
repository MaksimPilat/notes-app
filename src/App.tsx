import "./App.css";
import { NoteList, Bar, NoteEditor, TagFilter } from "@components/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialNotes } from "@redux/slices/noteListSlice";
import { getNotesFromIndexedDB } from "@utils/indexedDB";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesFromIndexedDB = await getNotesFromIndexedDB();
        notesFromIndexedDB.sort((a, b) => a.timestamp - b.timestamp);
        dispatch(setInitialNotes(notesFromIndexedDB));
      } catch (error) {
        console.error("Error fetching notes from IndexedDB:", error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <Bar />
      <NoteList />
      <NoteEditor />
      <TagFilter />
    </div>
  );
};

export default App;
