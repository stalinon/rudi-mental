import React, { useState } from 'react';
import {
  Box,
  Modal,
  Button,
  useTheme,
} from '@mui/material';

const commonSignatures = [
  [2, 4],
  [3, 4],
  [4, 4],
  [5, 4],
  [3, 8],
  [6, 8],
];

const TimeSignatureModal = ({ open, onClose, onSelect, initialTop = 4, initialBottom = 4 }) => {
  const theme = useTheme();
  const [top, setTop] = useState(initialTop);
  const [bottom, setBottom] = useState(initialBottom);

  const applyPreset = ([presetTop, presetBottom]) => {
    setTop(presetTop);
    setBottom(presetBottom);
    handleConfirm();
  };

  const handleConfirm = () => {
    onSelect({ top, bottom });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          bgcolor: theme.palette.background.paper,
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          mx: 'auto',
          mt: '15vh',
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', my: 2, gap: 1 }}>
          {commonSignatures.map(([t, b]) => (
            <Button
              key={`${t}/${b}`}
              variant="outlined"
              size="small"
              onClick={() => applyPreset([t, b])}
              sx={{ minWidth: 30 }}
            >
              {t}/{b}
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default TimeSignatureModal;
