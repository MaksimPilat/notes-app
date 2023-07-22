import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box } from "@mui/material";
import Note from "./Note";

export default function NoteList() {
  const notes = useSelector((state: RootState) => state.notesList.notes);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </Box>
  );
}
