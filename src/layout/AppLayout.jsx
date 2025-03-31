import React from 'react';
import BeatVisualizer from "../components/BeatVisualizer";
import NoteViewer from '../components/NoteViewer';
import MetronomeButton from '../components/buttons/MetronomeButton';
import TempoSlider from '../components/TempoSlider';

import ControlsPanel from '../components/ControlsPanel';
import ModalsManager from '../components/ModalsManager';

const AppLayout = (props) => {
  const {
    bpm,
    setBpm,
    currentBar,
    currentBeat,
    isActive,
    visible,
    exercise,
    metronomeSettings,
    setCurrentBar,
    setCurrentBeat,
    setIsActive,
    settingsOpen,
    exerciseModalOpen,
    openLibrary
  } = props;

  console.log(metronomeSettings)

  return (
    <div className="App">
      <div className="App__header">
        <ControlsPanel {...props} />
        <BeatVisualizer
          key={`${metronomeSettings.signature.top}/${metronomeSettings.signature.bottom}`}
          bpm={bpm}
          beatsPerBar={metronomeSettings.signature.top}
          isActive={isActive}
          metronomeSettings={metronomeSettings}
          onBarChange={setCurrentBar}
          onBeatChange={setCurrentBeat}
          setBpm={setBpm}
        />
      </div>

      <MetronomeButton bpm={bpm} isActive={isActive} onToggle={() => setIsActive(!isActive)} modalsClosed={!(settingsOpen || openLibrary || exerciseModalOpen)} />

      <NoteViewer
        exercise={exercise}
        currentBar={currentBar}
        currentBeat={currentBeat}
        beatsPerBar={metronomeSettings.signature.top}
        visible={visible}
      />

      <TempoSlider bpm={bpm} setBpm={setBpm} />

      <ModalsManager {...props} />
    </div>
  );
};

export default AppLayout;
