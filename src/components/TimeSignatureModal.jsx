import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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

  const changeTop = (delta) => setTop((v) => Math.max(1, v + delta));
  const changeBottom = (delta) => {
    const next = bottom + delta;
    const allowed = [1, 2, 4, 8, 16, 32];
    if (allowed.includes(next)) setBottom(next);
  };

  const applyPreset = ([presetTop, presetBottom]) => {
    setTop(presetTop);
    setBottom(presetBottom);
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
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
          <Box>
            <IconButton onClick={() => changeTop(-1)}><RemoveIcon /></IconButton>
            <Typography variant="h3">{top}</Typography>
            <IconButton onClick={() => changeTop(1)}><AddIcon /></IconButton>
          </Box>

          <Typography variant="h2" sx={{ fontFamily: 'serif', mx: 1, my: 'auto' }}>/</Typography>

          <Box>
            <IconButton onClick={() => changeBottom(-1)}><RemoveIcon /></IconButton>
            <Typography variant="h3">{bottom}</Typography>
            <IconButton onClick={() => changeBottom(1)}><AddIcon /></IconButton>
          </Box>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleConfirm}
          fullWidth
        >
          OK
        </Button>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 2, gap: 1 }}>
          {commonSignatures.map(([t, b]) => (
            <Button
              key={`${t}/${b}`}
              variant="outlined"
              size="small"
              onClick={() => applyPreset([t, b])}
              sx={{ minWidth: 60 }}
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
