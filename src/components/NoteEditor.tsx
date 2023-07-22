import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { changeNoteEditorContent, toggleNoteEditorVisibility } from "../redux/slices/noteEditorSlice";
import { useEffect, useRef, useState } from "react";
import { addNote } from "../redux/slices/noteListSlice";

export default function NoteEditor() {
  const dispatch = useDispatch();
  const { isVisible, content, tags } = useSelector((state: RootState) => state.noteEditor);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isChanged, setIsChanged] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const onHide = () => {
    dispatch(toggleNoteEditorVisibility());
    dispatch(changeNoteEditorContent(inputRef.current?.value || ""));
  };

  const onSave = () => {
    if (inputRef.current && inputRef.current?.value.trim() !== "") {
      const newNote = {
        content: inputRef.current.value,
        tags: [],
      };
      dispatch(addNote(newNote));
      dispatch(toggleNoteEditorVisibility());
    } else {
      setIsChanged(true);
      inputRef.current?.focus();
    }
  };

  const onCancel = () => {
    dispatch(changeNoteEditorContent(""));
    dispatch(toggleNoteEditorVisibility());
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
    <Dialog onClose={onHide} open={isVisible} PaperProps={{ sx: { minWidth: 600 } }}>
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
          error={isChanged && inputRef.current?.value.trim() === ""}
          helperText={
            isChanged && inputRef.current?.value.trim() === "" ? "Please enter at least one character." : null
          }
          onBlur={() => setIsChanged(false)}
          onChange={() => setIsChanged(false)}
          sx={{ marginTop: "5px" }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "10px 24px 20px" }}>
        <Button onClick={onSave} variant="contained">
          Save
        </Button>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
