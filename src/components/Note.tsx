import { Box, Card } from "@mui/material";
import OptionMenu from "./OptionMenu";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteNote, Note as NoteType } from "../redux/slices/noteListSlice";
import { changeNoteEditorContent, setNoteId, toggleNoteEditorVisibility } from "../redux/slices/noteEditorSlice";
import HighlightTags from "./HighlightTags";

export default function Note({ id, content, tags }: NoteType) {
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(changeNoteEditorContent(content));
    dispatch(setNoteId(id));
    dispatch(toggleNoteEditorVisibility());
  };

  const onDelete = () => {
    dispatch(deleteNote(id));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <HighlightTags>{content}</HighlightTags>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <OptionMenu
          options={[
            {
              icon: <Edit />,
              text: "Edit",
              action: onEdit,
            },
            {
              icon: <Delete />,
              text: "Delete",
              action: onDelete,
            },
          ]}
        />
      </Box>
    </Card>
  );
}
