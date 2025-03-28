import React from 'react';
import { Button, Box } from '@mui/material';

const ExerciseActions = ({ showButton, onClearExercise, onClose, onAdd, openLibrary }) => {
  return showButton ? (
    <Button fullWidth color="error" variant="outlined" onClick={() => {
      onClearExercise();
      onClose();
    }}>
      Сбросить упражнение
    </Button>
  ) : (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '5px'
    }}>
      <Button fullWidth variant="contained" onClick={onAdd}>
        Добавить упражнение
      </Button>
      <Button fullWidth variant="contained" onClick={openLibrary}>
        Выбрать из библиотеки
      </Button>
    </Box>
  );
};

export default ExerciseActions;
