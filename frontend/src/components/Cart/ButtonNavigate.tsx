import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface ButtonNavigateProps {
    showBackButton?: boolean
}

export function ButtonNavigate({ showBackButton = true}: ButtonNavigateProps) {

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
            <button onClick={() => { nextRoute && navigate(nextRoute) }}>Ir</button>
            {showBackButton && <button onClick={() => { navigate(-1) }}>Voltar</button>}
        </Box>
    );
}