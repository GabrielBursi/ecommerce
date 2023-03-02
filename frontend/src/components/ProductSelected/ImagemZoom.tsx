import { Box } from "@mui/material";
import { MyImageProps } from "../../types";
import { MyImage } from "../Products/MyImage";

export function ImagemZoom({alt, src}: MyImageProps) {
    return (
        <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
            <MyImage alt={alt} src={src} width='210px' />
        </Box>
    );
}
