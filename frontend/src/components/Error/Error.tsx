import { Box, Typography } from "@mui/material"

interface ErrorComponentProps {
    error: string | undefined;
}

export const ErrorComponent = ({ error }: ErrorComponentProps) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h4" color="error">
                Ocorreu um erro: {error}
            </Typography>
        </Box>
    )
}