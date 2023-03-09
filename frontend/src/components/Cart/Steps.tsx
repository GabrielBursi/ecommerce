import { Box } from "@mui/material";
import { useState } from "react";
import { Progress } from "./Progress";
import { StepperComponent } from "./Stepper";

interface Step {
    percentage: number,
    step: number
}

export function Steps() {

    const [step, setStep] = useState<Step>({percentage: 20, step: 0});

    return (
        <Box display='flex' alignItems='center' width='65%' height='25%' border='1px solid black'>
            <Box display='flex' justifyContent='center' alignItems='center' border='1px solid black' height='100%' width='20%'>
                <Progress value={step.percentage}/>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' border='1px solid black' height='100%' flex={1}>
                <StepperComponent step={step.step}/>
            </Box>
            <button onClick={() => setStep({ percentage: step.percentage + 20, step: step.step + 1})}>Ir</button>
            <button onClick={() => setStep({ percentage: step.percentage - 20, step: step.step - 1 })}>Voltar</button>
        </Box>
    );
}
