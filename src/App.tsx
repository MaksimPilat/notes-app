import "./App.css";
import { Card, Button } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Card variant="outlined">
        <div className="bg-blue-500 text-white">Note</div>
        <p>Some Lorem</p>
        <Button variant="contained">OK</Button>
      </Card>
    </div>
  );
}

export default App;
