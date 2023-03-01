import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import { IProducts } from "../../types";
import { MyImage } from "./MyImage";

export function MiniCardProduct({ img, price, title, id }: IProducts) {

    const [hover, setHover] = useState(false);
    const navigate = useNavigate()

    return (
        <Box
            onClick={() => navigate(`/product/${id}`)}
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            component={Paper}
            elevation={hover ? 10 : 2}
            sx={{
                width:'130px',
                height:'130px',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                cursor:'pointer',
            }}
        >
            <Box
                sx={{
                    flex:1,
                    width:'100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <MyImage src={img} alt={title} width='70px' />
            </Box>
            <Box
                sx={{
                    display:'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height:'20%',
                    width:'100%'
                }}
            >
                <Typography variant="subtitle1" color='primary' fontWeight='bold'>
                    {price}
                </Typography>
            </Box>
        </Box>
    );
}
