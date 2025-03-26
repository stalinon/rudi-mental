import React from 'react';
import { Button } from '@mui/material';

const ExerciseActions = ({ showButton, onClearExercise, onClose, onAdd }) => {
  return showButton ? (
    <Button fullWidth color="error" variant="outlined" onClick={() => {
      onClearExercise();
      onClose();
    }}>
      Сбросить упражнение
    </Button>
  ) : (
    <Button fullWidth variant="contained" onClick={onAdd}>
      Добавить упражнение
    </Button>
  );
};

export default ExerciseActions;
