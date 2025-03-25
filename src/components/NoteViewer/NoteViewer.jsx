import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';

const NoteViewer = ({
  exercise,
  currentBar,
  currentBeat,
  setIsActive = () => {},
  visible = false
}) => {
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
    const svgData = getBar(index);
    return (
      <Box
        key={key}
        sx={{
          width: 300,
          height: 100,
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
              marginBottom: index === 0 ? '15px' : '',
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
