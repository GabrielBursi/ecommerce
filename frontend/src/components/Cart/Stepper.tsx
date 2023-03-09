import { Stack, Step, StepLabel, Stepper } from "@mui/material";
import { ColorlibConnector, ColorlibStepIcon } from "./utils";

interface StepperComponentProps {
    step: number
}

export function StepperComponent({step}: StepperComponentProps) {

    const steps = [
        {label: 'Carrinho'},
        {label: 'Indentificação'},
        {label: 'Pagamento'},
        {label: 'Confirmação'},
        {label: 'Concluir'},
    ];

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper activeStep={step} alternativeLabel connector={<ColorlibConnector/>}>
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon} >{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}



