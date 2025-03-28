import React, { useEffect, useState } from 'react';
import {
  Modal,
  useTheme,
  Box,
  Typography,
  Divider
} from "@mui/material";
import { renderSvg } from '../../../helpers/renderSvg.js';

const NotePreview = ({ open, exercise, onClose }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const DEFAULT_COLOR = isDark ? theme.palette.primary.light : theme.palette.primary.main;
  const [barSvgs, setBarSvgs] = useState([]);

  useEffect(() => {
    if (exercise) {
      const svgs = renderSvg(exercise.link);
      setBarSvgs(svgs);
    }
  }, [exercise]);

  const totalBars = barSvgs.length;

  const getBar = (index) => {
    if (totalBars === 0) return null;
    const normalized = ((index % totalBars) + totalBars) % totalBars;
    return barSvgs[normalized];
  };

  const renderSlot = (index) => {
    const svgData = getBar(index);
    return (
      <Box
        key={index}
        sx={{
          width: 300,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          boxSizing: 'border-box',
        }}
      >
        {svgData ? (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              '& svg': {
                width: '100%',
                height: '100%',
                color: DEFAULT_COLOR,
                fill: DEFAULT_COLOR,
              }
            }}
            dangerouslySetInnerHTML={{ __html: svgData }}
          />
        ) : (
          <Box sx={{ width: '100%', height: '100%' }} />
        )}
      </Box>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: theme.palette.background.paper,
          padding: 4,
          borderRadius: 3,
          boxShadow: 24,
          maxWidth: 800,
          width: '90%',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
      >
        {/* Заголовок */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            marginBottom: 1,
          }}
        >
          {exercise.name}
        </Typography>

        {/* Описание */}
        {exercise && (
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              marginBottom: 2,
            }}
          >
            {exercise.description}
          </Typography>
        )}

        <Divider sx={{ marginBottom: 3 }} />

        {/* SVG-слайды */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {barSvgs.map((_, index) => renderSlot(index))}
        </Box>
      </Box>
    </Modal>
  );
};

export default NotePreview;
