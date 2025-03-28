import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import LibraryCard from './LibraryCard';

const LibraryList = ({ exercises, userExercises, loading, onPreviewOpen, onAdd }) => {
  const renderSkeletons = () => (
    [...Array(6)].map((_, i) => (
      <Grid item xs={12} sm={6} md={4} key={`skeleton-${i}`}>
        <Skeleton variant="rectangular" width="100%" height={150} sx={{ borderRadius: 2 }} />
      </Grid>
    ))
  );

  return (
    <Grid container spacing={3}>
      {loading
        ? renderSkeletons()
        : exercises.map((e, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <LibraryCard
                added={userExercises.some(u => u.link === e.link)}
                onModalOpen={() => onPreviewOpen(e)}
                handleAddExercise={() => onAdd(e)}
                exercise={e}
              />
            </Grid>
        ))}
    </Grid>
  );
};

export default LibraryList;
