import React, { useCallback, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const MIN_BPM = 20;
const MAX_BPM = 240;

const TempoSlider = ({ bpm, setBpm }) => {
  const theme = useTheme();
  const sliderRef = useRef(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const marksCount = isMobile ? 2 : isTablet ? 5 : 12;

  // Обработка колеса мыши
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY) * 5;
    setBpm((prev) => {
      let next = prev - delta;
      return Math.max(MIN_BPM, Math.min(MAX_BPM, next));
    });
  }, [setBpm]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (slider) {
        slider.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel]);

  // Прямое изменение
  const handleChange = (_, value) => {
    setBpm(value);
  };

  // Кнопки
  const changeBy = (delta) => {
    setBpm((prev) => {
      let next = prev + delta;
      return Math.max(MIN_BPM, Math.min(MAX_BPM, next));
    });
  };

  const stepSize = Math.floor((MAX_BPM - MIN_BPM) / (marksCount - 1));
  const marks = Array.from({ length: marksCount }, (_, i) => MIN_BPM + i * stepSize);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        width: '100%',
        maxWidth: '100%',
      }}
    >
      {/* Кнопка минус */}
      <IconButton onClick={() => changeBy(-1)}>
        <ArrowDropDownIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {/* Слайдер */}
      <Box
        ref={sliderRef}
        sx={{
          flexGrow: 1,
          mx: 2,
          position: 'relative',
        }}
      >
        <Slider
          value={bpm}
          onChange={handleChange}
          step={5}
          min={MIN_BPM}
          max={MAX_BPM}
          sx={{
            color: theme.palette.primary.main,
            height: 8,
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              border: '2px solid white',
              backgroundColor: theme.palette.background.paper,
            },
            '& .MuiSlider-rail': {
              opacity: 0.3,
              backgroundColor: theme.palette.grey[800],
            },
            '& .MuiSlider-track': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
        {/* Метки делений */}
        <Box
          sx={{
            position: 'absolute',
            top: 32,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            px: 1,
          }}
        >
          {marks.map((value) => {
            return (
              <Typography
                key={value}
                variant="caption"
                sx={{ color: theme.palette.text.disabled }}
              >
                {value}
              </Typography>
            );
          })}
        </Box>
      </Box>

      {/* Кнопка плюс */}
      <IconButton onClick={() => changeBy(1)}>
        <ArrowDropUpIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Box>
  );
};

export default TempoSlider;
