import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface ButtonNavigateProps {
    showBackButton?: boolean
    showGoButton?: boolean
}

export function ButtonNavigate({ showBackButton = true, showGoButton = true }: ButtonNavigateProps) {

    const navigate = useNavigate()
    const location = useLocation();

    const nextRoutes: { [key: string]: string | null } = {
        "/cart": "/cart/identification",
        "/cart/identification": "/cart/identification/payment",
        "/cart/identification/payment": "/cart/identification/payment/confirm",
        "/cart/identification/payment/confirm": "/cart/identification/payment/confirm/done",
        "/cart/identification/payment/confirm/done": null
    };

    const nextRoute = nextRoutes[location.pathname];

    return (
        <Box>
            {showGoButton && <button type="button" onClick={() => { nextRoute && navigate(nextRoute) }}>Ir</button>}
            {showBackButton && <button type="button" onClick={() => { navigate(-1) }}>Voltar</button>}
        </Box>
    );
}