import { useContext } from "react";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";

export function ListProductsPage() {

    const { isLogged } = useContext(LoginContext)

    return (
        <LayoutBase showResearchInput showUserInfo showBanner showActions = {isLogged}>
            
        </LayoutBase>
    );
}