import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Typography } from "@mui/material";
import Note from "./Note";
import Tag from "./Tag";

export default function NoteList() {
  const { notes } = useSelector((state: RootState) => state.notesList);
  const { selectedTags } = useSelector((state: RootState) => state.tagFilter);

  const renderNotes = () => {
    if (selectedTags.length === 0) {
      return notes.map((note) => <Note key={note.id} {...note} />);
    }
    const filteredNotes = notes.filter((note) =>
      note.tags.some((tag) => selectedTags.includes(tag))
    );
    return filteredNotes.map((note) => <Note key={note.id} {...note} />);
  };

  return (
    <Box sx={{ marginTop: "30px" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {selectedTags.length ? (
          <Typography marginTop={0.5}>Filter:</Typography>
        ) : null}
        {selectedTags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {renderNotes()}
      </Box>
    </Box>
  );
}
