import "./App.css";
import NoteList from "./components/NoteList";
import Bar from "./components/Bar";
import NoteEditor from "./components/NoteEditor";

const App: React.FC = () => {
  return (
    <div className="App">
      <Bar />
      <NoteList />
      <NoteEditor />
    </div>
  );
};

export default App;
