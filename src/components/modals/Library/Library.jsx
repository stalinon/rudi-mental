import React, { useEffect, useState } from 'react';
import {
  Modal, useTheme, Typography, Fade, Paper
} from '@mui/material';

import { listExercises } from '../../../api/nocodb';
import LibraryList from './LibraryList';
import LoadMoreButton from './LoadMoreButton';
import NotePreview from './NotePreview';
import { getUserExercises, saveUserExercise } from '../ExerciseModal/exerciseStorage';

const LIMIT = 25;

const Library = ({ open, handleClose }) => {
  const theme = useTheme();

  const [userExercises, setUserExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [preview, setPreview] = useState(false);
  const [previewEx, setPreviewEx] = useState(null);
  const [totalCards, setTotalCards] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchExercises = async (reset = false) => {
      if (reset) setLoading(true);
      const data = await listExercises(reset ? 0 : offset, LIMIT);
      setTotalCards(data.total);
      setExercises(prev => reset ? data.list : [...prev, ...data.list]);
      setLoading(false);
      setLoadingMore(false);
    };

    if (open) {
      setOffset(0);
      fetchExercises(true);
      setUserExercises(getUserExercises());
    }
  }, [open, offset]);

  const loadMore = () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    setLoadingMore(true);
    listExercises(newOffset, LIMIT).then(data => {
      setExercises(prev => [...prev, ...data.list]);
      setLoadingMore(false);
    });
  };

  const handleAdd = (exercise) => {
    saveUserExercise({
      name: exercise.name,
      link: exercise.link,
      timeSignature: exercise.timeSignature
    }, false);
    setUserExercises(getUserExercises());
  };

  const hasMore = exercises.length < totalCards;

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 1200,
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: 3,
            borderRadius: 3,
            boxShadow: 24,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Библиотека упражнений
          </Typography>

          <LibraryList
            exercises={exercises}
            userExercises={userExercises}
            loading={loading}
            onPreviewOpen={(e) => { setPreviewEx(e); setPreview(true); }}
            onAdd={handleAdd}
          />

          <LoadMoreButton
            hasMore={hasMore}
            loading={loadingMore}
            onClick={loadMore}
          />

          {previewEx && (
            <NotePreview
              open={preview}
              exercise={previewEx}
              onClose={() => setPreview(false)}
            />
          )}
        </Paper>
      </Fade>
    </Modal>
  );
};

export default Library;
