import "./App.css";
import NoteList from "./components/NoteList";
import Bar from "./components/Bar";
import NoteEditor from "./components/NoteEditor";
import TagFilter from "./components/TagFilter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialNotes } from "./redux/slices/noteListSlice";
import { getNotesFromIndexedDB } from "./utils/indexedDB";

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
