import { Box, Typography } from "@mui/material";
import { IProducts } from "../../types";

export function NameProduct({name}: Pick<IProducts, 'name'>) {
    return (
        <Box width='100%' height='20%'>
            <Typography
                variant="h5"
                color="black"
                fontWeight="bold"
                overflow='hidden'
                textOverflow='ellipsis'
                sx={{ wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
            >
                {name}
            </Typography>
        </Box>
    );
}
