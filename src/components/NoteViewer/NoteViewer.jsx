import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';

const NoteViewer = ({
  exercise,
  currentBar,
  currentBeat,
  beatsPerBar,
  visible = false
}) => {
  const SLOT_WIDTH = 300;
  const SLOT_HEIGHT = 100;

  const [barSvgs, setBarSvgs] = useState([]);
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const DEFAULT_COLOR = isDark ? theme.palette.primary.light : null;

  useEffect(() => {
    if (exercise) {
      const myGrooveUtils = new window.GrooveUtils();
      const grooveData = myGrooveUtils.getGrooveDataFromUrlString(exercise);
      const abcNotation = myGrooveUtils.createABCFromGrooveData(grooveData, 300);
      const svgReturn = myGrooveUtils.renderABCtoSVG(abcNotation);

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgReturn.svg, "text/html");
      const svgElements = doc.querySelectorAll("svg");

      const svgs = Array.from(svgElements).map(svgEl => {
        // Удаляем размеры тактов
        const groups = svgEl.querySelectorAll('g[style*="font:bold 16px serif"]');
        groups.forEach(g => g.remove());

        // Удаляем размер svg
        svgEl.removeAttribute("width");
        svgEl.removeAttribute("height");

        const svgString = new XMLSerializer().serializeToString(svgEl);
        return svgString;
      });

      setBarSvgs(svgs);
    }
  }, [exercise]);

  // Зацикливание по currentBar
  const totalBars = barSvgs.length;
  const getBar = (index) => {
    if (totalBars === 0) return null;
    const normalized = ((index % totalBars) + totalBars) % totalBars;
    return barSvgs[normalized];
  };

  // Рендер ячейки
  const renderSlot = (index, key, isCurrent = false) => {
    const padding = 20;
    const svgData = getBar(index);  
    const beatWidth = (SLOT_WIDTH - padding * 2) / beatsPerBar;
    const beatLeft = currentBeat * beatWidth + padding;
  
    return (
      <Box
        key={key}
        sx={{
          width: SLOT_WIDTH,
          height: SLOT_HEIGHT,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: isCurrent ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
          borderRadius: 2,
          boxSizing: 'border-box',
          opacity: isCurrent ? 1 : 0.7,
          backgroundColor: isCurrent ? theme.palette.action.hover : 'transparent'
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
                fill: DEFAULT_COLOR
              }
            }}
            dangerouslySetInnerHTML={{ __html: svgData }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%' }} />
        )}
  
        {/* 👇 рамка поверх, только в текущем такте */}
        {isCurrent && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: `${beatLeft}px`,
              width: `${beatWidth}px`,
              height: '100%',
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              borderRadius: 1,
              pointerEvents: 'none',
              transition: 'left 0.2s ease-in-out'
            }}
          />
        )}
      </Box>
    );
  };  

  return (
    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
      {visible && totalBars > 0 && (
        <>
          {renderSlot(currentBar - 1, 'prev')}
          {renderSlot(currentBar, 'curr', true)}
          {renderSlot(currentBar + 1, 'next')}
        </>
      )}
    </Box>
  );
};

export default NoteViewer;
