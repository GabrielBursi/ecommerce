import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CarouselBannerProps } from "../../types";
import { MyImage } from "../Products/MyImage";

export function CarouselBanner({ alt, src, to }: CarouselBannerProps) {

    const navigate = useNavigate()

    return (
        <Box
            onClick={() => navigate(to)}
            sx={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
                <MyImage key={alt} alt={alt} src={src} height='300px' width='1568px'/>
        </Box>
    );
}
