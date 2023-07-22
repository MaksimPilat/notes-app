import "./App.css";
import NoteList from "./components/NoteList";
import Bar from "./components/Bar";
import NoteEditor from "./components/NoteEditor";
import TagFilter from "./components/TagFilter";

const App: React.FC = () => {
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
