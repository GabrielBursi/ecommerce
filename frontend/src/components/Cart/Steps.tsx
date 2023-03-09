import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Progress } from "./Progress";
import { StepperComponent } from "./Stepper";

interface Step {
    percentage: number,
    step: number
}

export function Steps() {

    const [step, setStep] = useState<Step>({percentage: 20, step: 0});
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

    useEffect(() => {
        
        switch (location.pathname) {
            case "/cart":
                setStep({ percentage: 20, step: 0 });
                break;
            case "/cart/identification":
                setStep({ percentage: 40, step: 1 });
                break;
            case "/cart/identification/payment":
                setStep({ percentage: 60, step: 2 });
                break;
            case "/cart/identification/payment/confirm":
                setStep({ percentage: 80, step: 3 });
                break;
            case "/cart/identification/payment/confirm/done":
                setStep({ percentage: 100, step: 4 });
                break;
            default:
                setStep({ percentage: 20, step: 0 });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <Box display='flex' alignItems='center' width='65%' height='25%' border='1px solid black'>
            <Box display='flex' justifyContent='center' alignItems='center' border='1px solid black' height='100%' width='20%'>
                <Progress value={step.percentage}/>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' border='1px solid black' height='100%' flex={1}>
                <StepperComponent step={step.step}/>
            </Box>
            
        </Box>
    );
}
