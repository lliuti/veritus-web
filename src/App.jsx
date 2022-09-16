import { Router } from "./routes"
import { AuthProvider } from "./contexts/auth";
import CssBaseline from '@mui/material/CssBaseline';
import { ToggleColorMode } from "./contexts/colorMode/mode";

export function App() {
  return (
    <ToggleColorMode>
      <AuthProvider>
        <CssBaseline />
        <Router/>
      </AuthProvider>
    </ToggleColorMode>
  )
}