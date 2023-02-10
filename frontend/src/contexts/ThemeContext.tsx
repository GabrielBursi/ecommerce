import { createContext, useCallback, useMemo, useState } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { DarkTheme, LightTheme } from "../theme";
import { ChildrenProp } from "../types";

interface IThemeContextData {
    themeName: 'light' | 'dark',
    toggleTheme: () => void
}

const ThemeContext = createContext({} as IThemeContextData)

function ThemeContextProvider({children}: ChildrenProp) {

    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, [])

    const theme = useMemo(() => {
        if(themeName === 'dark') return DarkTheme

        return LightTheme
    }, [themeName])

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export {
    ThemeContext,
    ThemeContextProvider
}

