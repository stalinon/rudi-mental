import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const MetronomeButton = ({ bpm, isActive, onToggle }) => {
  const theme = useTheme();

  // Цвета из темы
  const activeStart = theme.palette.primary.light;
  const activeEnd = theme.palette.secondary.light;
  const inactiveStart = theme.palette.grey[500];
  const inactiveEnd = theme.palette.grey[700];

  const gradient = isActive
    ? `linear-gradient(135deg, ${activeStart}, ${activeEnd})`
    : `linear-gradient(135deg, ${inactiveStart}, ${inactiveEnd})`;

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onToggle]);

  return (
    <Box
      onClick={onToggle}
      sx={{
        width: 200,
        height: 200,
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
          ? `0 0 20px 5px ${activeStart}80`
          : `0 0 10px ${theme.palette.grey[900]}30`,
        userSelect: 'none',
      }}
    >
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {bpm}
      </Typography>

      <Typography variant="subtitle2" color={theme.palette.text.secondary}>
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
        }}
      >
        пробел
      </Typography>
    </Box>
  );
};

export default MetronomeButton;
