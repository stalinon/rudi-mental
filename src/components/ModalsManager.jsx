import React from 'react';
import MetronomeSettingsModal from './modals/Settings/MetronomeSettingsModal';
import ExerciseSelectorModal from './modals/ExerciseModal/ExerciseSelectorModal';
import Library from './modals/Library/Library';

const ModalsManager = ({
  settingsOpen,
  setSettingsOpen,
  metronomeSettings,
  setMetronomeSettings,
  exerciseModalOpen,
  setExerciseModalOpen,
  loadExercise,
  clearExercise,
  visible,
  openLibrary,
  setOpenLibrary
}) => {
  return (
    <>
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
        onClearExercise={clearExercise}
        openLibrary={() => setOpenLibrary(true)}
        isLibraryOpen={openLibrary}
      />

      <Library open={openLibrary} handleClose={() => setOpenLibrary(false)} />
    </>
  );
};

export default ModalsManager;
