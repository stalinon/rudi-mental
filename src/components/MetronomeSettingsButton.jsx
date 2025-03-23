import React from 'react';
import { Box, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const MetronomeSettingsButton = ({ onClick }) => {
  const theme = useTheme();  

  return (
    <Box sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={onClick}>
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: `2px solid ${theme.palette.grey[600]}`,
          display: 'flex',
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
        <SettingsIcon sx={{ fontSize: 28, color: theme.palette.text.primary }} />
      </Box>
    </Box>
  );
};

export default MetronomeSettingsButton;
