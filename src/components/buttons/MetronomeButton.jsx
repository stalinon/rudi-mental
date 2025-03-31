import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const MetronomeButton = ({ bpm, isActive, onToggle, modalsClosed, isPulsing }) => {
  const theme = useTheme();

  const activeStart = theme.palette.primary.light;
  const activeEnd = theme.palette.secondary.light;
  const inactiveStart = theme.palette.grey[500];
  const inactiveEnd = theme.palette.grey[700];

  const gradient = isActive
    ? `linear-gradient(135deg, ${activeStart}, ${activeEnd})`
    : `linear-gradient(135deg, ${inactiveStart}, ${inactiveEnd})`;

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && modalsClosed) {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onToggle, modalsClosed]);

  return (
    <Box
      onClick={onToggle}
      sx={{
        width: 200,
        height: 200,
        position: 'relative',
        borderRadius: '50%',
        backgroundColor: theme.palette.background.default,
        border: '4px solid transparent',
        backgroundImage: `${gradient}, ${theme.palette.background.default}`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'border-box, padding-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        boxShadow: isActive
          ? `0 0 20px 5px ${theme.palette.primary.main}80`
          : `0 0 10px ${theme.palette.mode === 'light' ? theme.palette.grey[900] : theme.palette.primary.light}30`,
        userSelect: 'none',

        '&::after': isPulsing
          ? {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              opacity: 0.05,
              animation: 'gentlePulse 1000ms ease-out',
              pointerEvents: 'none',
              zIndex: -1,
              filter: 'blur(20px)',
            }
          : {},

        '@keyframes gentlePulse': {
          '0%': {
            opacity: 0.15,
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '50%': {
            opacity: 0.05,
            transform: 'translate(-50%, -50%) scale(1.05)',
          },
          '100%': {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(1.05)',
          },
        },
      }}
    >
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          zIndex: 1,
        }}
      >
        {bpm}
      </Typography>

      <Typography variant="subtitle2" color={theme.palette.text.secondary} sx={{ zIndex: 1 }}>
        ударов в мин.
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.disabled,
          mt: 1,
          px: 1,
          py: 0.2,
          borderRadius: 1,
          backgroundColor: theme.palette.action.hover,
          fontSize: '0.65rem',
          zIndex: 1,
        }}
      >
        пробел
      </Typography>
    </Box>
  );
};

export default MetronomeButton;
