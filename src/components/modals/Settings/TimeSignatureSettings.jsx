import React, { useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';

const commonSignatures = [
  [2, 4],
  [3, 4],
  [4, 4],
  [5, 4],
  [3, 8],
  [6, 8],
];

const TimeSignatureSettings = ({ onSelect, initialTop = 4, initialBottom = 4 }) => {
  const [top, setTop] = useState(initialTop);
  const [bottom, setBottom] = useState(initialBottom);

  const theme = useTheme();

  const applyPreset = ([presetTop, presetBottom]) => {
    setTop(presetTop);
    setBottom(presetBottom);
    handleConfirm(presetTop, presetBottom);
  };

  const handleConfirm = (t = top, b = bottom) => {
    onSelect({ top: t, bottom: b });
  };

  const getButtonStyle = (t, b) => {
    const isSelected = t === top && b === bottom;
    return {
      minWidth: 40,
      padding: '8px 12px',
      backgroundColor: isSelected ? theme.palette.primary.light : 'transparent',
      color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: isSelected ? theme.palette.primary.dark : theme.palette.grey[100],
        transform: 'scale(1.05)',
      },
    };
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', my: 2, gap: 2 }}>
        {commonSignatures.map(([t, b]) => (
          <Button
            key={`${t}/${b}`}
            variant="outlined"
            size="small"
            onClick={() => applyPreset([t, b])}
            sx={getButtonStyle(t, b)}
          >
            {t}/{b}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default TimeSignatureSettings;
