// AddExerciseModal.jsx
import React, { useState } from 'react';
import {
  Modal, Box, Typography, TextField, Button, useTheme
} from '@mui/material';

const AddExerciseModal = ({ open, onClose, onAdd }) => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [file, setFile] = useState('');
  const [timeTop, setTimeTop] = useState(4);
  const [timeBottom, setTimeBottom] = useState(4);

  const handleAdd = () => {
    if (!name || !file) return;
    onAdd({
      name,
      file,
      timeSignature: { top: Number(timeTop), bottom: Number(timeBottom) }
    });
    onClose();
    setName('');
    setFile('');
    setTimeTop(4);
    setTimeBottom(4);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        width: 400,
        bgcolor: theme.palette.background.paper,
        p: 3,
        borderRadius: 2,
        boxShadow: 24,
        mx: 'auto',
        mt: '10vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography variant="h6">Новое упражнение</Typography>
        <TextField label="Название" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Ссылка (Groove Scribe)" value={file} onChange={(e) => setFile(e.target.value)} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Размер (верх)"
            type="number"
            value={timeTop}
            onChange={(e) => setTimeTop(e.target.value)}
          />
          <TextField
            label="Размер (низ)"
            type="number"
            value={timeBottom}
            onChange={(e) => setTimeBottom(e.target.value)}
          />
        </Box>
        <Button variant="contained" onClick={handleAdd}>Добавить</Button>
      </Box>
    </Modal>
  );
};

export default AddExerciseModal;
