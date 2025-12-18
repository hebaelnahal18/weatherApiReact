import logo from './logo.svg';
import './App.css';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Weather from './components/Weather';

const theme=createTheme({
  typography:{
  fontFamily:['IBM']
}
})


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Weather/>

      </ThemeProvider>
    </div>
  );
}

export default App;
