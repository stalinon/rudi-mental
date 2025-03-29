import React from 'react';
import {
  Box, Typography, Slider, FormControlLabel, Checkbox
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ProgressionSettings = ({
  tempoProgression, setTempoProgression,
  enableProgression, setEnableProgression
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Box>
      <Typography>Прогрессия темпа (BPM)</Typography>
      <Slider
        value={tempoProgression}
        onChange={(e, val) => setTempoProgression(val)}
        min={5}
        max={50}
        step={5}
        valueLabelDisplay="auto"
      />
    </Box>

    <FormControlLabel
      control={
        <Checkbox
          checked={enableProgression}
          onChange={(e) => setEnableProgression(e.target.checked)}
        />
      }
      label="Включить прогрессию темпа"
    />
    
    {enableProgression && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberIcon fontSize="small" color="warning" />
        <Typography variant="body2" color="text.secondary">
          Темп будет повышаться каждые 10 тактов.
        </Typography>
      </Box>
    )}
  </Box>
);

export default ProgressionSettings;
