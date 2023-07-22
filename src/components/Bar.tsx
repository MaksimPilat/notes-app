import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { Tune, Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { toggleNoteEditorVisibility } from "../redux/slices/noteEditorSlice";

export default function Bar() {
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch(toggleNoteEditorVisibility());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes
          </Typography>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Tune />
          </IconButton>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }} onClick={onAdd}>
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
