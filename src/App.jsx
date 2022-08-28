import { Router } from "./routes"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey } from "@mui/material/colors";
import { AuthProvider } from "./contexts/auth";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: blueGrey[400]
    },
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