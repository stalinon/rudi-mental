import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, Button, Tabs, Tab,
  useMediaQuery, useTheme, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CommonSettings from './CommonSettings';
import SoundSettings from './SoundSettings';
import ProgressionSettings from './ProgressionSettings';

const MetronomeSettingsModal = ({ open, onClose, onApply, initialValues }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Состояния
  const [playBars, setPlayBars] = useState(0);
  const [muteBars, setMuteBars] = useState(0);
  const [tempoProgression, setTempoProgression] = useState(0);
  const [signature, setSignature] = useState({ top: 4, bottom: 4 });
  const [accentSound, setAccentSound] = useState('accent');
  const [regularSound, setRegularSound] = useState('click');
  const [volumeAccent, setVolumeAccent] = useState(100);
  const [volumeRegular, setVolumeRegular] = useState(100);
  const [enableProgression, setEnableProgression] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setPlayBars(initialValues.playBars || 0);
      setMuteBars(initialValues.muteBars || 0);
      setTempoProgression(initialValues.tempoProgression || 0);
      setSignature(initialValues.signature || { top: 4, bottom: 4 });
      setAccentSound(initialValues.accentSound || 'accent');
      setRegularSound(initialValues.regularSound || 'click');
      setVolumeAccent(initialValues.volumeAccent || 100);
      setVolumeRegular(initialValues.volumeRegular || 100);
      setEnableProgression(initialValues.enableProgression || false);
    }
  }, [open, initialValues]);

  const handleApply = () => {
    onApply({
      playBars,
      muteBars,
      tempoProgression,
      signature,
      accentSound,
      regularSound,
      volumeAccent,
      volumeRegular,
      enableProgression
    });
    onClose();
  }; 

  const tabPanels = [
    <CommonSettings
      playBars={playBars}
      setPlayBars={setPlayBars}
      muteBars={muteBars} 
      setMuteBars={setMuteBars}
      signature={signature}
      setSignature={setSignature} />,
    <SoundSettings 
     accentSound={accentSound} setAccentSound={setAccentSound}
     regularSound={regularSound} setRegularSound={setRegularSound}
     volumeAccent={volumeAccent} setVolumeAccent={setVolumeAccent}
     volumeRegular={volumeRegular} setVolumeRegular={setVolumeRegular} />,
    <ProgressionSettings
      tempoProgression={tempoProgression} setTempoProgression={setTempoProgression}
      enableProgression={enableProgression} setEnableProgression={setEnableProgression} />
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: '95vw', sm: 500 },
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: theme.palette.background.paper,
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          mx: 'auto',
          mt: { xs: '5vh', sm: '10vh' },
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center">
          Настройки метронома
        </Typography>

        {isMobile ? (
          <>
            {tabPanels.map((content, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">
                    {['Общие', 'Звуки', 'Прогрессия'][index]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {content}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        ) : (
          <>
            <Tabs
              value={tabIndex}
              onChange={(e, newValue) => setTabIndex(newValue)}
              textColor="primary"
              indicatorColor="primary"
              centered
              sx={{ mb: 2 }}
            >
              <Tab label="Общие" />
              <Tab label="Звуки" />
              <Tab label="Прогрессия" />
            </Tabs>
            <Box>{tabPanels[tabIndex]}</Box>
          </>
        )}

        <Button
          variant="outlined"
          onClick={handleApply}
          color="primary"
          sx={{ mt: 3, width: '100%' }}
        >
          Применить
        </Button>
      </Box>
    </Modal>
  );
};

export default MetronomeSettingsModal;
