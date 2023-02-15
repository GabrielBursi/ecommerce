import { useContext } from "react";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";

export function ProductPage() {

    const { isLogged } = useContext(LoginContext)

    return (
        <LayoutBase showResearchInput showUserInfo showActions = {isLogged}>
            <h1>Product Page</h1>
        </LayoutBase>
    );
}