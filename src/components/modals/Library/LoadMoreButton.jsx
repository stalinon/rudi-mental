import React from 'react';
import { Button, Box, CircularProgress } from '@mui/material';

const LoadMoreButton = ({ hasMore, loading, onClick }) => {
  if (!hasMore) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Button
        variant="outlined"
        onClick={onClick}
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? 'Загрузка...' : 'Загрузить ещё'}
      </Button>
    </Box>
  );
};

export default LoadMoreButton;
