import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Divider, useTheme } from '@mui/material';
import AddExerciseModal from './AddExerciseModal';
import ExerciseList from './ExerciseList';
import UserExerciseList from './UserExerciseList';
import ExerciseActions from './ExerciseActions';

import { getUserExercises, saveUserExercise } from './exerciseStorage';

const ExerciseSelectorModal = ({ open, onClose, onSelect, onClearExercise, showButton }) => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);
  const [userFiles, setUserFiles] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [removeIndexes, setRemoveIndexes] = useState({});

  useEffect(() => {
    if (open) {
      fetch(`${process.env.PUBLIC_URL}/exercises/index.json`)
        .then(res => res.json())
        .then(setFiles)
        .catch(console.error);
      setUserFiles(getUserExercises());
    }
  }, [open]);

  const handleAddExercise = (exercise) => {
    saveUserExercise(exercise);
    setUserFiles(getUserExercises());
  };

  const handleRemove = (index) => {
    setRemoveIndexes((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      const updated = [...userFiles];
      updated.splice(index, 1);
      localStorage.setItem('userExercises', JSON.stringify(updated));
      setUserFiles(updated);
      setRemoveIndexes({});
    }, 300);
  };

  return (
    <>
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

          <ExerciseList files={files} onSelect={onSelect} onClose={onClose} />

          <UserExerciseList
            userFiles={userFiles}
            onSelect={onSelect}
            onClose={onClose}
            onRemove={handleRemove}
            removeIndexes={removeIndexes}
          />

          <Divider sx={{ my: 2 }} />

          <ExerciseActions
            showButton={showButton}
            onClearExercise={onClearExercise}
            onClose={onClose}
            onAdd={() => setAddModalOpen(true)}
          />
        </Box>
      </Modal>

      <AddExerciseModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddExercise}
      />
    </>
  );
};

export default ExerciseSelectorModal;
