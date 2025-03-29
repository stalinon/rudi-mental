import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TimeSignatureSettings from './TimeSignatureSettings';

const CommonSettings = ({
   playBars, setPlayBars, muteBars, setMuteBars, 
   signature, setSignature  
}) => {
    const handleTimeSignatureSelect = ({ top, bottom }) => {
      setSignature({ top, bottom });
    };
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Тактов со звуком"
          type="number"
          value={playBars}
          onChange={(e) => setPlayBars(Math.max(0, parseInt(e.target.value)))}
          inputProps={{ min: 0 }}
          fullWidth />
        <TextField
          label="Тактов в тишине"
          type="number"
          value={muteBars}
          onChange={(e) => setMuteBars(Math.max(0, parseInt(e.target.value)))}
          inputProps={{ min: 0 }}
          fullWidth />
        {(playBars === 0 || muteBars === 0) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningAmberIcon fontSize="small" color="warning" />
            <Typography variant="body2" color="text.secondary">
              Метроном будет играть бесконечно без фаз отключения звука.
            </Typography>
          </Box>
        )}
        {/* Модалка для выбора размера такта */}
        <TimeSignatureSettings
          onSelect={handleTimeSignatureSelect}
          initialTop={signature.top}
          initialBottom={signature.bottom} />
      </Box>
    );
  };

export default CommonSettings;
