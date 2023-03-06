import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IProducts } from "../../../types";

export function NameProduct({name}: Pick<IProducts, 'name'>) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box width='100%' minHeight={mdDown ? '10%' : '15%'}>
            <Typography
                variant={mdDown ? "subtitle1" : "h6"}
                color="black"
                fontWeight="bold"
                overflow='hidden'
                textOverflow='ellipsis'
                sx={{ wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: mdDown ? 2 : 3, WebkitBoxOrient: "vertical" }}
            >
                {name}
            </Typography>
        </Box>
    );
}
