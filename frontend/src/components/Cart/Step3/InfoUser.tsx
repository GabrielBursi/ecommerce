import { Box, Typography } from "@mui/material";

interface InfoUserProps {
    infos: info[];
    principalInfo?: string;
}

export type info = {
    nome: string;
    dados?: string;
}

export function InfoUser({infos, principalInfo}: InfoUserProps) {
    return (
        <Box width='50%' height='auto' bgcolor='#fafafb' padding={1}>
            <Typography variant="subtitle1" fontWeight='bold'>
                {principalInfo}
            </Typography>
            {infos.map((info, index) => 
                <Box key={index} display='flex' gap={1}>
                    <Typography variant="subtitle1" fontWeight='bold'>
                        {info.nome}
                    </Typography>
                    <Typography variant="subtitle1">
                        {info.dados}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}