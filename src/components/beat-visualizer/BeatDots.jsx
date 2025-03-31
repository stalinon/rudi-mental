import React from 'react';
import { Box, useTheme } from '@mui/material';
import { getDotStyle } from './utils/getDotStyle';

export const BeatDots = ({ currentBeat, beatsPerBar }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
      {Array.from({ length: beatsPerBar }).map((_, i) => (
        <Box key={i} sx={getDotStyle(i, currentBeat, theme)} />
      ))}
    </Box>
  );
};

export default BeatDots;
