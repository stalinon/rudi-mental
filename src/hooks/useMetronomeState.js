import { useState } from 'react';

export default function useMetronomeState() {
  const [darkMode, setDarkMode] = useState(false);
  const [exercise, setExercise] = useState(null);
  const [visible, setVisible] = useState(false);
  const [bpm, setBpm] = useState(80);
  const [isActive, setIsActive] = useState(false);
  const [currentBar, setCurrentBar] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [open, setOpen] = useState(false);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [openLibrary, setOpenLibrary] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const initialMetronomeSettings = {
    playBars: 0,
    muteBars: 0,
    tempoProgression: 0,
    accentSound: 'accent',
    regularSound: 'click',
    volumeAccent: 100,
    volumeRegular: 100,
    enableProgression: false,
    signature: { top: 4, bottom: 4 }
  };
  
  const [metronomeSettings, setMetronomeSettings] = useState(initialMetronomeSettings);

  const loadExercise = (fileName, timeSignature) => {
    setExercise(fileName);
    setVisible(true);
    setIsActive(false);
    setCurrentBar(0);
    setCurrentBeat(0);
  };

  const clearExercise = () => {
    setExercise(null);
    setVisible(false);
    setIsActive(false);
  };

  return {
    darkMode, setDarkMode,
    exercise, setExercise,
    visible, setVisible,
    bpm, setBpm,
    isActive, setIsActive,
    currentBar, setCurrentBar,
    currentBeat, setCurrentBeat,
    open, setOpen,
    exerciseModalOpen, setExerciseModalOpen,
    openLibrary, setOpenLibrary,
    settingsOpen, setSettingsOpen,
    metronomeSettings, setMetronomeSettings,
    loadExercise, clearExercise,
  };
}
