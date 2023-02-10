import { cyan, deepPurple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: deepPurple[700],
            dark: deepPurple[800],
            light: deepPurple[500],
            contrastText: "#fff",
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: "#fff",
        },
        background: {
            default: "#303134",
            paper: "#202124",
        }
    }
})