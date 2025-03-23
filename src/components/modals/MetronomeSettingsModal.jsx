import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const MetronomeSettingsModal = ({ open, onClose, onApply, initialValues }) => {
  const theme = useTheme();
  const [playBars, setPlayBars] = useState(initialValues.playBars || 0);
  const [muteBars, setMuteBars] = useState(initialValues.muteBars || 0);

  useEffect(() => {
    if (open) {
      setPlayBars(initialValues.playBars || 0);
      setMuteBars(initialValues.muteBars || 0);
    }
  }, [open, initialValues]);

  const handleApply = () => {
    onApply({ playBars, muteBars });
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
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center">
          Настройки метронома
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Тактов со звуком"
            type="number"
            value={playBars}
            onChange={(e) => setPlayBars(Math.max(0, parseInt(e.target.value)))}
            inputProps={{ min: 0 }}
            fullWidth
          />

          <TextField
            label="Тактов в тишине"
            type="number"
            value={muteBars}
            onChange={(e) => setMuteBars(Math.max(0, parseInt(e.target.value)))}
            inputProps={{ min: 0 }}
            fullWidth
          />

            {(playBars === 0 || muteBars === 0) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <WarningAmberIcon fontSize="small" color="warning" />
                <Typography variant="body2" color="text.secondary">
                Метроном будет играть бесконечно без фаз отключения звука.
                </Typography>
            </Box>
            )}

          <Button
            variant="outlined"
            onClick={handleApply}
            color="primary"
            sx={{ mt: 2 }}
          >
            Применить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MetronomeSettingsModal;
