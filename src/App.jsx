import './App.css';
import React, { useState } from 'react';
import MetronomeButton from './components/MetronomeButton';
import TempoSlider from './components/TempoSlider';
import BeatVisualizer from "./components/BeatVisualizer";
import TimeSignatureModal from './components/TimeSignatureModal';
import TimeSignatureButton from './components/TimeSignatureButton';

function App() {
  const [bpm, setBpm] = useState(80);
  const [isActive, setIsActive] = useState(false);

  const [signature, setSignature] = useState({ top: 4, bottom: 4 });
  const [open, setOpen] = useState(false);

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
          </div>
          <BeatVisualizer bpm={bpm} beatsPerBar={signature.bottom} isActive={isActive} />
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
    </div>
  );
}

export default App;
