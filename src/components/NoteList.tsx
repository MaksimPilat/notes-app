import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Typography } from "@mui/material";
import Note from "./Note";
import Tag from "./Tag";

export default function NoteList() {
  const { notes } = useSelector((state: RootState) => state.notesList);
  const { selectedTags } = useSelector((state: RootState) => state.tagFilter);

  const renderNotes = () => {
    if (notes.length === 0)
      return (
        <Typography textAlign={"center"} color={"GrayText"}>
          You don't have any notes yet.
        </Typography>
      );
    if (selectedTags.length === 0) {
      return notes.map((note) => <Note key={note.id} {...note} />);
    }
    const filteredNotes = notes.filter((note) =>
      note.tags.some((tag) => selectedTags.includes(tag))
    );
    return filteredNotes.map((note) => <Note key={note.id} {...note} />);
  };

  return (
    <Box marginTop="30px">
      {selectedTags.length ? (
        <Box display="flex" flexWrap="wrap" gap="5px" marginBottom="20px">
          <Typography fontWeight={600} margin={"3px 4px 0 3px"}>
            Filter:
          </Typography>

          {selectedTags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </Box>
      ) : null}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(290px, 1fr))"
        gap="20px"
      >
        {renderNotes()}
      </Box>
    </Box>
  );
}
