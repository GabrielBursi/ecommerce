import { useContext } from "react";
import { ThemeContext } from "../contexts";
import { Button } from "@mui/material";
import {LayoutBase} from "../layouts";

export function HomePage() {

    const { toggleTheme } = useContext(ThemeContext)

    return (
        <LayoutBase title="Header" showResearchInput showUserInfo>
            <h1>Home Page</h1>
            <Button variant="contained" color="primary" onClick={toggleTheme}>Teste</Button>

        </LayoutBase>
    );
}
