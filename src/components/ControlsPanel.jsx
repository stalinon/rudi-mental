import React from 'react';
import CircleIconButton from './buttons/CircleIconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ControlsPanel = ({ darkMode, setDarkMode, setSettingsOpen, setExerciseModalOpen }) => {
  return (
    <div className="App__header__settings">
      <CircleIconButton
        caption="Настройки"
        onClick={() => setSettingsOpen(true)}
        icon={<SettingsIcon />}
      />
      <CircleIconButton
        caption="Упражнения"
        onClick={() => setExerciseModalOpen(true)}
        icon={<AccessibleForwardIcon />}
      />
      <CircleIconButton
        caption={darkMode ? 'Темная' : 'Православная'}
        icon={darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        onClick={() => setDarkMode((prev) => !prev)}
      />
    </div>
  );
};

export default ControlsPanel;
