import React, { useEffect, useState, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import * as Tone from 'tone';

const MAX_BPM = 240;

const BeatVisualizer = ({
  bpm = 80,
  beatsPerBar = 4,
  isActive = false,
  metronomeSettings = 
  { 
    playBars: 0,
    muteBars: 0, 
    accentSound: 'accent', 
    regularSound: 'click', 
    volumeAccent: 100, 
    volumeRegular: 100, 
    tempoProgression: 0,
    enableProgression: false
  },
  onBarChange = () => {},
  onBeatChange = () => {},
  setBpm = (bpm) => {},
}) => {
  const theme = useTheme();
  const [currentBeat, setCurrentBeat] = useState(-1);
  const intervalRef = useRef(null);
  const lastTriggerTime = useRef(0);

  const synth = useRef(null);
  const accent = useRef(null);

  const isCyclic = metronomeSettings.playBars > 0 && metronomeSettings.muteBars > 0;

  const { tempoProgression, enableProgression } = metronomeSettings;
  const accentSound = metronomeSettings.accentSound;
  const regularSound = metronomeSettings.regularSound;
  const volumeAccent = metronomeSettings.volumeAccent;
  const volumeRegular = metronomeSettings.volumeRegular;

  useEffect(() => {
    synth.current = new Tone.Player(`${process.env.PUBLIC_URL}/sounds/${regularSound}.mp3`).toDestination();
    accent.current = new Tone.Player(`${process.env.PUBLIC_URL}/sounds/${accentSound}.mp3`).toDestination();
  
    // Set volume
    synth.current.volume.value = volumeRegular - 100;
    accent.current.volume.value = volumeAccent - 100;
  
    return () => {
      synth.current.dispose();
      accent.current.dispose();
    };
  }, [accentSound, regularSound, volumeAccent, volumeRegular]);
  

  const playClick = (index) => {
    const now = Tone.now();
    if (now <= lastTriggerTime.current) return;
    lastTriggerTime.current = now;
    if (index === 0) {
      accent.current.start(now);
    } else {
      synth.current.start(now);
    }
  };

  useEffect(() => {
    if (!isActive) {
      clearInterval(intervalRef.current);
      setCurrentBeat(-1);
      return;
    }

    Tone.start();

    let beat = -1;
    let barCounter = 0;
    let isMuted = false;

    const intervalMs = (60_000 / bpm);

    intervalRef.current = setInterval(() => {
      beat = (beat + 1) % beatsPerBar;

       if (bpm > MAX_BPM) {
        setBpm(MAX_BPM);
       }

       // Каждый раз, когда начинается новый такт
       if (beat === 0) {          
          if (isCyclic) {
            const total = isMuted ? metronomeSettings.muteBars : metronomeSettings.playBars;
            if (barCounter >= total) {
              isMuted = !isMuted;
              barCounter = 0;
            }
          }
          
          barCounter++;
          onBarChange(barCounter - 1);
          if (enableProgression && barCounter > 10) {
            // Увеличиваем BPM по прогрессии
            const progressTempo = bpm + tempoProgression;
            if (bpm !== progressTempo) {
              // Сохраняем новый темп
              setBpm(progressTempo)
              return () => clearInterval(intervalRef.current);
            }
          }
        }

        onBeatChange(beat);

      if (!isMuted) {
        playClick(beat);
      }
      setCurrentBeat(beat);
    }, intervalMs);

    return () => clearInterval(intervalRef.current);
  }, [isActive, bpm, beatsPerBar, isCyclic, metronomeSettings, onBarChange, onBeatChange, enableProgression, setBpm, tempoProgression]);

  const getDotStyle = (i) => {
    const isCurrent = i === currentBeat;
    const isFirst = i === 0;
    const isFirstActive = isCurrent && isFirst;
  
    if (!isCurrent) {
      return {
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `2px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.background.default,
      };
    }
  
    const gradient = isFirstActive
      ? `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
      : `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`;
  
    const boxShadow = isFirstActive
      ? `0 0 12px ${theme.palette.primary.main}AA`
      : `0 0 6px ${theme.palette.primary.main}55`;
  
    return {
      width: 20,
      height: 20,
      borderRadius: '50%',
      backgroundColor: theme.palette.background.default,
      border: '2px solid transparent',
      backgroundImage: `${gradient}, ${theme.palette.background.default}`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'border-box, padding-box',
      boxShadow,
      transition: 'all 0.2s ease',
    };
  };  

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
      {Array.from({ length: beatsPerBar }).map((_, i) => (
        <Box key={i} sx={getDotStyle(i)} />
      ))}
    </Box>
  );
};

export default BeatVisualizer;