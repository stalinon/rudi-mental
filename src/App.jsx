import './App.css';
import React, { useState } from 'react';
import MetronomeButton from './components/MetronomeButton';
import TempoSlider from './components/TempoSlider';
import BeatVisualizer from "./components/BeatVisualizer";
import TimeSignatureModal from './components/TimeSignatureModal';
import TimeSignatureButton from './components/TimeSignatureButton';
import MetronomeSettingsModal from './components/MetronomeSettingsModal';
import MetronomeSettingsButton from './components/MetronomeSettingsButton';


function App() {
  const [bpm, setBpm] = useState(80);
  const [isActive, setIsActive] = useState(false);

  const [signature, setSignature] = useState({ top: 4, bottom: 4 });
  const [open, setOpen] = useState(false);

  const [metronomeSettings, setMetronomeSettings] = useState({
    playBars: 0,
    muteBars: 0,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleMetronome = () => setIsActive((prev) => !prev);
  return (
    <div className="App">
        <div className='App__header'>
          <div className='App__header__settings'>
            <TimeSignatureButton
              top={signature.top}
              bottom={signature.bottom}
              onClick={() => setOpen(true)}
            />
            <MetronomeSettingsButton
              onClick={() => setSettingsOpen(true)}
            />
          </div>
          <BeatVisualizer bpm={bpm} beatsPerBar={signature.top} isActive={isActive} metronomeSettings={metronomeSettings} />
        </div>
        <MetronomeButton bpm={bpm} isActive={isActive} onToggle={toggleMetronome} />
      <TempoSlider bpm={bpm} setBpm={setBpm} />

      <TimeSignatureModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={setSignature}
        initialTop={signature.top}
        initialBottom={signature.bottom}
      />

      <MetronomeSettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        initialValues={metronomeSettings}
        onApply={(values) => setMetronomeSettings(values)}
      />
    </div>
  );
}

export default App;
