import { useContext } from "react";
import { LoginContext, ThemeContext } from "../contexts";
import { Button } from "@mui/material";
import {LayoutBase} from "../layouts";

export function HomePage() {

    const { toggleTheme } = useContext(ThemeContext)
    const { isLogged } = useContext(LoginContext)

    return (
        <LayoutBase showResearchInput showUserInfo showActions = {isLogged}>
            <h1>Home Page</h1>
            <Button variant="contained" color="primary" onClick={toggleTheme}>Teste</Button>

        </LayoutBase>
    );
}
