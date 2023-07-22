import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { changeNoteEditorContent, setNoteId, toggleNoteEditorVisibility } from "../redux/slices/noteEditorSlice";
import { useEffect, useRef, useState } from "react";
import { addNote, updateNote } from "../redux/slices/noteListSlice";

export default function NoteEditor() {
  const dispatch = useDispatch();
  const { isVisible, content, tags, noteId } = useSelector((state: RootState) => state.noteEditor);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onHide = () => {
    dispatch(toggleNoteEditorVisibility());
  };

  const onSave = () => {
    if (inputRef.current && inputRef.current?.value.trim() !== "") {
      const newNote = {
        content: inputRef.current?.value,
        tags: tags,
        id: noteId ? noteId : "",
      };
      const action = noteId ? updateNote : addNote;
      dispatch(action(newNote));
      dispatch(setNoteId(""));
      dispatch(changeNoteEditorContent(""));
      dispatch(toggleNoteEditorVisibility());
    } else {
      setIsChanged(true);
      inputRef.current?.focus();
    }
  };

  const onCancel = () => {
    dispatch(changeNoteEditorContent(""));
    dispatch(setNoteId(""));
    dispatch(toggleNoteEditorVisibility());
  };

  const onInputChange = () => {
    setIsChanged(false);
    dispatch(changeNoteEditorContent(inputRef.current?.value || ""));
  };

  const isInputValid = () => (isChanged && inputRef.current?.value.trim() === "" ? true : false);

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
    <Dialog onClose={onHide} open={isVisible} PaperProps={{ sx: { width: "100%" } }}>
      <DialogTitle>Note Editor</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={inputRef}
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          fullWidth
          rows={4}
          defaultValue={content}
          error={isInputValid()}
          helperText={isInputValid() ? "Please enter at least one character." : null}
          onBlur={() => setIsChanged(false)}
          onChange={onInputChange}
          sx={{ marginTop: "5px" }}
        />
        <Box sx={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {tags.length ? <Typography marginTop={0.5}>Tags:</Typography> : null}
          {tags.map((tag, index) => (
            <span
              style={{ padding: "6px", fontSize: "15px", border: "2px solid var(--blue)", borderRadius: "14px" }}
              key={index}
            >
              {tag}
            </span>
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
