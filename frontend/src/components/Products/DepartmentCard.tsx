import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DepartmentCardProps } from "../../types";
import { MyImage } from "./MyImage";

export function DepartmentCard({title, src, to}: DepartmentCardProps) {

    const [hover, setHover] = useState<boolean>(false);

    const navigate = useNavigate()

    return (
        <Box
            component={Paper}
            elevation={ hover ? 10 : 2 }
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate(to)}
            sx={{
                height: '70%',
                display:'flex',
                flexDirection: 'column',
                alignItems:'center',
                padding: 1,
                gap:2,
                cursor: 'pointer'
            }}
        >
            <Typography variant="subtitle1" fontWeight='bold' color={hover ? 'primary' : 'black'}>
                {title.toUpperCase()}
            </Typography>
            <Box
                sx={{
                    zIndex:1,
                }}
            >
                <MyImage alt={title} src={src} />
            </Box>
        </Box>
    );
}
