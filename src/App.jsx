import { Router } from "./routes"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey, grey, brown, deepPurple, red, indigo, pink } from "@mui/material/colors";
import { AuthProvider } from "./contexts/auth";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: blueGrey[400]
    },
    untrained: {
      main: blueGrey[400],
      contrastText: '#fff'
    },
    trained: {
      main: blueGrey[400],
      contrastText: '#fff'
    },
    veteran: {
      main: blueGrey[400],
      contrastText: '#fff'
    },
    expert: {
      main: blueGrey[400],
      contrastText: '#fff'
    }
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Router/>
      </AuthProvider>
    </ThemeProvider>
  )
}