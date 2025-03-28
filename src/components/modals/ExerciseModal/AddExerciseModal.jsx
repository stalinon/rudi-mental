import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Stack
} from '@mui/material';

const AddExerciseModal = ({ open, onClose, onAdd }) => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [file, setFile] = useState('');
  const [description, setDescription] = useState('');
  const [timeTop, setTimeTop] = useState(4);
  const [timeBottom, setTimeBottom] = useState(4);
  const [errors, setErrors] = useState({});

  const isValidUrl = (url) =>
    url.includes('mikeslessons.com/groove') || url.includes('montulli.github.io/GrooveScribe');

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Обязательное поле';
    if (!file.trim()) newErrors.file = 'Обязательное поле';
    else if (!isValidUrl(file)) newErrors.file = 'Ссылка должна вести на Groove Scribe';

    if (!timeTop || isNaN(timeTop)) newErrors.timeTop = 'Обязательное число';
    if (!timeBottom || isNaN(timeBottom)) newErrors.timeBottom = 'Обязательное число';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    onAdd({
      name,
      link: file,
      description,
      timeSignature: {
        top: Number(timeTop),
        bottom: Number(timeBottom),
      },
    });

    onClose();
    setName('');
    setFile('');
    setDescription('');
    setTimeTop(4);
    setTimeBottom(4);
    setErrors({});
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          maxWidth: '90vw',
          bgcolor: theme.palette.background.paper,
          p: 4,
          borderRadius: 3,
          boxShadow: 24,
          mx: 'auto',
          mt: '10vh',
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Добавить новое упражнение
          </Typography>

          <TextField
            label="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Ссылка (Groove Scribe)"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            fullWidth
            error={!!errors.file}
            helperText={errors.file}
          />

          <TextField
            label="Описание (необязательно)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Размер (верх)"
              type="number"
              value={timeTop}
              onChange={(e) => setTimeTop(e.target.value)}
              fullWidth
              error={!!errors.timeTop}
              helperText={errors.timeTop}
            />
            <TextField
              label="Размер (низ)"
              type="number"
              value={timeBottom}
              onChange={(e) => setTimeBottom(e.target.value)}
              fullWidth
              error={!!errors.timeBottom}
              helperText={errors.timeBottom}
            />
          </Stack>

          <Box sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              onClick={handleAdd}
            >
              Добавить
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddExerciseModal;
