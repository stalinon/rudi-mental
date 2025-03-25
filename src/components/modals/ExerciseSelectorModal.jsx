import React, { useEffect, useState } from 'react';
import {
  Modal, Box, Typography, List, ListItemButton, Divider, Button, useTheme
} from '@mui/material';

const ExerciseSelectorModal = ({ open, onClose, onSelect, onClearExercise, showButton }) => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (open) {
      fetch(`${process.env.PUBLIC_URL}/exercises/index.json`)
        .then(res => res.json())
        .then(setFiles)
        .catch(console.error);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        width: 320,
        bgcolor: theme.palette.background.paper,
        p: 3,
        borderRadius: 2,
        boxShadow: 24,
        mx: 'auto',
        mt: '15vh'
      }}>
        <Typography variant="h6" gutterBottom>Выбор упражнения</Typography>

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

        <Divider sx={{ my: 2 }} />

        {showButton && <Button fullWidth color="error" variant="outlined" onClick={() => {
          onClearExercise();
          onClose();
        }}>
          Сбросить упражнение
        </Button>}
      </Box>
    </Modal>
  );
};

export default ExerciseSelectorModal;
