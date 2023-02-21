import { useContext } from "react";
import { LoginContext, ThemeContext } from "../contexts";
import { Button } from "@mui/material";
import {LayoutBase} from "../layouts";

export function HomePage() {

    const { toggleTheme } = useContext(ThemeContext)
    const { isLogged, setIsLogged } = useContext(LoginContext)

    return (
        <LayoutBase showResearchInput showUserInfo showActions = {isLogged}>
            <h1>Home Page</h1>
            <Button variant="contained" color="primary" onClick={toggleTheme}>Mudar tema</Button>
            <Button variant="contained" color="primary" onClick={() => setIsLogged(!isLogged)}>{isLogged ? 'Logout' : 'Login'}</Button>
        </LayoutBase>
    );
}
