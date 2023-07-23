import "./App.css";
import NoteList from "./components/NoteList";
import Bar from "./components/Bar";
import NoteEditor from "./components/NoteEditor";
import TagFilter from "./components/TagFilter";
import { useEffect } from "react";
import { fetchNotesFromDB } from "./utils/dataFetching";
import { useDispatch } from "react-redux";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNotesFromDB(dispatch);
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
