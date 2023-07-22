import { Box, Card, Typography } from "@mui/material";
import OptionMenu from "./OptionMenu";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  updateNote,
  deleteNote,
  Note as NoteType,
} from "../redux/slices/noteListSlice";

export default function Note({ id, content, tags }: NoteType) {
  const dispatch = useDispatch();

  const onEdit = () => {
    const newNote = {
      id: id,
      content: "123",
      tags: tags,
    };
    dispatch(updateNote(newNote));
    console.log("Edit");
  };

  const onDelete = () => {
    dispatch(deleteNote(id));
    console.log("Delete");
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
      <Typography>{content}</Typography>
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
