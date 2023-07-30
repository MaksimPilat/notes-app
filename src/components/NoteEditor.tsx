import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  changeNoteEditorContent,
  setNoteId,
  toggleNoteEditorVisibility,
} from "../redux/slices/noteEditorSlice";
import { addNote, updateNote } from "../redux/slices/noteListSlice";
import { Tag } from ".";
import { v4 as uuidv4 } from "uuid";

export default function NoteEditor() {
  const dispatch = useDispatch();
  const { isVisible, content, tags, noteId } = useSelector(
    (state: RootState) => state.noteEditor
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onInputChange = () => {
    setIsChanged(false);
    dispatch(changeNoteEditorContent(inputRef.current?.value || ""));
  };

  const isInputValid = () =>
    isChanged && inputRef.current?.value.trim() === "" ? true : false;

  const onHide = () => {
    dispatch(toggleNoteEditorVisibility());
  };

  const onSave = () => {
    if (inputRef.current && inputRef.current?.value.trim() !== "") {
      const newNote = {
        content: inputRef.current?.value,
        tags: tags,
        id: noteId ? noteId : uuidv4(),
        timestamp: Date.now(),
      };
      const action = noteId ? updateNote : addNote;
      dispatch(action(newNote));
      dispatch(setNoteId(""));
      dispatch(changeNoteEditorContent(""));
      onHide();
    } else {
      setIsChanged(true);
      inputRef.current?.focus();
    }
  };

  const onCancel = () => {
    dispatch(changeNoteEditorContent(""));
    dispatch(setNoteId(""));
    onHide();
  };

  useEffect(() => {
    isVisible ? setIsFocused(true) : setIsFocused(false);
  }, [isVisible]);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isFocused]);

  return (
    <Dialog
      onClose={onHide}
      open={isVisible}
      PaperProps={{ sx: { width: "100%", margin: "30px 20px" } }}
    >
      <DialogTitle>Note Editor</DialogTitle>
      <DialogContent sx={{ overflow: "auto" }}>
        <TextField
          inputRef={inputRef}
          id="outlined-multiline-static"
          label="Type here"
          multiline
          minRows={4}
          fullWidth
          defaultValue={content}
          error={isInputValid()}
          helperText={
            isInputValid() ? "Please enter at least one character." : null
          }
          onBlur={() => setIsChanged(false)}
          onChange={onInputChange}
          sx={{
            marginTop: "5px",
          }}
        />
        <Box marginTop="10px" display="flex" flexWrap="wrap" gap="5px">
          {tags.length ? (
            <Typography margin={"2px 4px 0 0"}>Tags:</Typography>
          ) : null}
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "10px 24px 20px" }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
