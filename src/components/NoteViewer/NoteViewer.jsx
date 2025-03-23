import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import BarRendererVex from './BarRendererVex';

const NoteViewer = ({
  exercise,
  currentBar,
  currentBeat,
  setIsActive = () => {},
  visible = false
}) => {
  const bars = exercise ? exercise.bars : [];
  const prev = bars[currentBar - 1] || [];
  const current = bars[currentBar] || [];
  const next = bars[currentBar + 1] || [];

  useEffect(() => {
    if (currentBar >= bars.length && visible) {
      setIsActive(false);
    }
  }, [currentBar, bars.length, setIsActive, visible]);

  return (
    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
      {visible && 
        <>
          <BarRendererVex key={currentBar - 1} barNotes={prev} isCurrent={false} />
          <BarRendererVex key={currentBar} barNotes={current} isCurrent={true} currentBeat={currentBeat} />
          <BarRendererVex key={currentBar + 1} barNotes={next} isCurrent={false} />
        </>
      }
    </Box>
  );
};

export default NoteViewer;
