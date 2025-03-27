import React, { useEffect, useState } from 'react';
import { Modal, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { renderSvg } from '../../../helpers/renderSvg.js';

const NotePreview = ({open, link, onClose}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const DEFAULT_COLOR = isDark ? theme.palette.primary.light : null;
  const [barSvgs, setBarSvgs] = useState([]);

    useEffect(() => {
        if (link) {
            const svgs = renderSvg(link);
            setBarSvgs(svgs);
        }
    }, [link]);

    const totalBars = barSvgs.length;
    const getBar = (index) => {
      if (totalBars === 0) return null;
      const normalized = ((index % totalBars) + totalBars) % totalBars;
      return barSvgs[normalized];
    };
  
    // Рендер ячейки
    const renderSlot = (index) => {
        var svgData = getBar(index);
        return (
            <Box
                key={index}
                sx={{
                    width: 300,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid transparent',
                    borderRadius: 2,
                    boxSizing: 'border-box',
                    marginBottom: index === 0 ? "15px" : ""
                }}
            >
                {svgData ? (
                <Box
                    sx={{
                    width: '100%',
                    height: '100%',
                    marginBottom: '',
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
    <Modal open={open} onBackdropClick={onClose}>
      <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            alignItems: 'center',
            background: theme.palette.background.paper,
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            flexWrap: 'wrap',
            overflow: 'hidden',
            maxHeight: '80%'
        }} onClick={onClose}>
            {totalBars > 0 && barSvgs.map((bar, index) => renderSlot(index))}
      </Box>
    </Modal>
  );
};

export default NotePreview;
