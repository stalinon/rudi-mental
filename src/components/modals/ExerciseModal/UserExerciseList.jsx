import React from 'react';
import {
  Typography, List, ListItem, ListItemButton, IconButton, Collapse, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UserExerciseList = ({ userFiles, onSelect, onClose, onRemove, removeIndexes }) => {
  if (userFiles.length === 0) return null;

  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" gutterBottom>Мои упражнения</Typography>
      <List dense>
        {userFiles.map((file, index) => (
          <Collapse key={`user-${index}`} in={!removeIndexes[index]} timeout={300}>
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton edge="end" size="small" onClick={() => onRemove(index)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  onSelect(file.file, file.timeSignature);
                  onClose();
                }}
              >
                {file.name}
              </ListItemButton>
            </ListItem>
          </Collapse>
        ))}
      </List>
    </>
  );
};

export default UserExerciseList;
