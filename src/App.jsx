import './App.css';
import React, { useState } from 'react';
import TempoSlider from './components/TempoSlider';
import BeatVisualizer from "./components/BeatVisualizer";
import NoteViewer from './components/NoteViewer/NoteViewer';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

import MetronomeSettingsModal from './components/modals/MetronomeSettingsModal';
import ExerciseSelectorModal from './components/modals/ExerciseModal/ExerciseSelectorModal';
import TimeSignatureModal from './components/modals/TimeSignatureModal';

import MetronomeButton from './components/buttons/MetronomeButton';
import CircleIconButton from './components/buttons/CircleIconButton';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const [exercise, setExercise] = useState(null);
  const [visible, setVisible] = useState(false);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false); 

  const [bpm, setBpm] = useState(80);
  const [isActive, setIsActive] = useState(false);

  const [currentBar, setCurrentBar] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);

  const [signature, setSignature] = useState({ top: 4, bottom: 4 });
  const [open, setOpen] = useState(false);

  const [metronomeSettings, setMetronomeSettings] = useState({
    playBars: 0,
    muteBars: 0,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  const loadExercise = (fileName, timeSignature) => {
    setExercise(fileName);
    setSignature(timeSignature);

    setVisible(true);
    setIsActive(false);
    setCurrentBar(0);
    setCurrentBeat(0);
  }; 

  const toggleMetronome = () => setIsActive((prev) => !prev);
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="App">
        <div className='App__header'>
          <div className='App__header__settings'>
            <CircleIconButton key={`${signature.top}/${signature.bottom}`} caption="Размер" onClick={() => setOpen(true)} labelTop={signature.top} labelBottom={signature.bottom} />
            <CircleIconButton caption="Настройки" onClick={() => setSettingsOpen(true)} icon={<SettingsIcon />} />
            <CircleIconButton caption="Упражнения" onClick={() => setExerciseModalOpen(true)} icon={<AccessibleForwardIcon />} />
            <CircleIconButton caption={darkMode ? 'Темная' : 'Православная'} icon={darkMode ? <DarkModeIcon /> : <LightModeIcon />} onClick={() => setDarkMode(prev => !prev)}/>
          </div>
            <BeatVisualizer
              key={`${signature.top}/${signature.bottom}`}
              bpm={bpm}
              beatsPerBar={signature.top}
              isActive={isActive}
              metronomeSettings={metronomeSettings}
              onBarChange={setCurrentBar}
              onBeatChange={setCurrentBeat}
            />
          </div>
        <MetronomeButton bpm={bpm} isActive={isActive} onToggle={toggleMetronome} />
        <NoteViewer
          exercise={exercise}
          currentBar={currentBar}
          currentBeat={currentBeat}
          setIsActive={setIsActive}
          visible={visible}
        />

      <TempoSlider bpm={bpm} setBpm={setBpm} />

      <TimeSignatureModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(signature) => {
          if (!visible) {
            setSignature(signature);
          }
        }}
        initialTop={signature.top}
        initialBottom={signature.bottom}
      />

      <MetronomeSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        initialValues={metronomeSettings}
        onApply={(values) => setMetronomeSettings(values)}
      />

      <ExerciseSelectorModal
        showButton={visible}
        open={exerciseModalOpen}
        onClose={() => setExerciseModalOpen(false)}
        onSelect={loadExercise}
        onClearExercise={() => {
          setExercise(null);
          setVisible(false);
          setIsActive(false);
        }}
      />
    </div>
    </ThemeProvider>
  );
}

export default App;
