import { useState, createContext, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey, brown, deepOrange, deepPurple, indigo, purple, teal, orange } from "@mui/material/colors";

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
    mode: "dark"
});

export const ToggleColorMode = ({ children }) => {
    const [mode, setMode] = useState("dark");

    useEffect(() => {
        const storedMode = localStorage.getItem("mode");
        if (!storedMode) {
            setMode("dark");
        } else {
            setMode(storedMode);
        }
    }, [])

    const colorMode = useMemo(
        () => 
            ({
                toggleColorMode: () => {
                    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
                },
                mode
            }),
        [mode],
    );

    const theme = useMemo(
        () =>
        createTheme({
            palette: {
                mode,
                ...(mode === 'dark'
                ? {
                    secondary: {
                        main: blueGrey[400],
                        // main: orange[500],
                    }
                    }
                : {
                    secondary: {
                        // main: brown[500]
                        // main: purple[400],
                        // main: deepPurple[400],
                        // main: teal[400],
                        // main: deepOrange[500],
                        main: indigo[500],
                        // main: orange[500],
                    }
                }),
            },
        }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}