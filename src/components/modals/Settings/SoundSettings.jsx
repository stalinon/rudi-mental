import React from 'react';
import {
  Box, FormControl, InputLabel, Select, MenuItem, Typography, Slider
} from '@mui/material';

const SoundSettings = ({
  accentSound, setAccentSound,
  regularSound, setRegularSound,
  volumeAccent, setVolumeAccent,
  volumeRegular, setVolumeRegular
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <FormControl fullWidth>
      <InputLabel>Звук акцентного такта</InputLabel>
      <Select
        value={accentSound}
        onChange={(e) => setAccentSound(e.target.value)}
        label="Звук акцентного такта"
      >
        <MenuItem value="accent">Пинг-понг</MenuItem>
        <MenuItem value="click">Щелчок пальцами</MenuItem>
      </Select>
    </FormControl>

    <FormControl fullWidth>
      <InputLabel>Звук обычного такта</InputLabel>
      <Select
        value={regularSound}
        onChange={(e) => setRegularSound(e.target.value)}
        label="Звук обычного такта"
      >
        <MenuItem value="accent">Пинг-понг</MenuItem>
        <MenuItem value="click">Щелчок пальцами</MenuItem>
      </Select>
    </FormControl>

    <Box>
      <Typography>Громкость акцентного такта</Typography>
      <Slider
        value={volumeAccent}
        onChange={(e, val) => setVolumeAccent(val)}
        min={0}
        max={100}
        step={5}
        valueLabelDisplay="auto"
      />
    </Box>

    <Box>
      <Typography>Громкость обычного такта</Typography>
      <Slider
        value={volumeRegular}
        onChange={(e, val) => setVolumeRegular(val)}
        min={0}
        max={100}
        step={5}
        valueLabelDisplay="auto"
      />
    </Box>
  </Box>
);

export default SoundSettings;
