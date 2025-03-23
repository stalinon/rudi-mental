import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const TimeSignatureButton = ({ top, bottom, onClick }) => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={onClick}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
        Размер
      </Typography>

      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: `2px solid ${theme.palette.grey[600]}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.paper,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 8px ${theme.palette.primary.main}55`,
          },
        }}
      >
        <Typography variant="subtitle2" fontWeight={500}>
          {top}
        </Typography>
        <Typography variant="subtitle2" fontWeight={500}>
          {bottom}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeSignatureButton;
