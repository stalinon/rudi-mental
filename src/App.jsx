import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AppLayout from './layout/AppLayout';
import useMetronomeState from './hooks/useMetronomeState';

function App() {
  const state = useMetronomeState();

  const theme = createTheme({
    palette: {
      mode: state.darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout {...state} />
    </ThemeProvider>
  );
}

export default App;
