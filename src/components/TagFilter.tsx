import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  toggleTagFilterVisibility,
  changeTagFilterTags,
  changeTagFilterSelectedTags,
} from "../redux/slices/tagFilterSlice";
import { useEffect, useState } from "react";
import { Note } from "../redux/slices/noteListSlice";

const getAllTags = (notes: Note[]) => {
  const tags: string[] = [];
  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  return tags;
};

export default function TagFilter() {
  const dispatch = useDispatch();
  const {
    isVisible,
    tags,
    selectedTags: reduxSelectedTags,
  } = useSelector((state: RootState) => state.tagFilter);
  const { notes } = useSelector((state: RootState) => state.notesList);

  const [selectedTags, setSelectedTags] = useState<string[]>(reduxSelectedTags);

  useEffect(() => {
    dispatch(changeTagFilterTags(getAllTags(notes)));
  }, [notes]);

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTag = event.target.value;
    const isSelected = selectedTags.includes(selectedTag);

    let updatedSelectedTags;
    if (isSelected) {
      updatedSelectedTags = selectedTags.filter((tag) => tag !== selectedTag);
    } else {
      updatedSelectedTags = [...selectedTags, selectedTag];
    }
    setSelectedTags(updatedSelectedTags);
  };

  const onHide = () => {
    dispatch(toggleTagFilterVisibility());
  };

  const onApply = () => {
    dispatch(changeTagFilterSelectedTags(selectedTags));
    onHide();
  };

  const onCancel = () => {
    setSelectedTags(reduxSelectedTags);
    onHide();
  };

  const onClear = () => {
    setSelectedTags([]);
    dispatch(changeTagFilterSelectedTags([]));
    onHide();
  };

  return (
    <Dialog
      onClose={onHide}
      open={isVisible}
      PaperProps={{ sx: { width: "100%", margin: "30px 20px" } }}
    >
      <DialogTitle>Tag Filter</DialogTitle>
      <DialogContent>
        <Box display="flex" gap="10px">
          {tags.map((tag) => (
            <FormControlLabel
              key={tag}
              control={
                <Checkbox
                  checked={selectedTags.includes(tag)}
                  onChange={handleTagChange}
                  value={tag}
                  sx={{ width: "30px", height: "30px" }}
                />
              }
              label={tag}
              sx={{ margin: 0 }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "10px 24px 20px",
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <Button onClick={onClear} variant="outlined" color="error">
          Clear
        </Button>
        <Box display="flex" gap="8px">
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onApply} variant="contained">
            Apply
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
