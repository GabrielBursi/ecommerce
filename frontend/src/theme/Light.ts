import { cyan, deepPurple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
    palette:{
        primary: {
            main: deepPurple[700],
            dark: deepPurple[800],
            light: deepPurple[500],
            contrastText: "#fff",
        },
        secondary:{
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: "#fff",
        },
        background:{
            default: "#f7f6f3",
            paper: "#fff",
        }
    }
})