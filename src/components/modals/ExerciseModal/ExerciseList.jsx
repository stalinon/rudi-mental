import React from 'react';
import { List, ListItemButton } from '@mui/material';

const ExerciseList = ({ files, onSelect, onClose }) => (
  <List dense>
    {files.map((file) => (
      <ListItemButton
        key={file.file}
        onClick={() => {
          onSelect(file.file, file.timeSignature);
          onClose();
        }}
      >
        {file.name}
      </ListItemButton>
    ))}
  </List>
);

export default ExerciseList;
