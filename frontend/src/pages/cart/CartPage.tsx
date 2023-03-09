import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ButtonNavigate, Steps } from "../../components";
import { LayoutBase } from "../../layouts";

export function CartPage() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <LayoutBase showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%' border='1px solid red'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' alignItems='center' paddingY={2} gap={2} border='1px solid green'>
                    <Steps/>
                    <Box width='100%' height='100%' border='1px solid black' display='flex' gap={4}>
                        <Box border='1px solid black' flex={1} display='flex' flexDirection='column' gap={4}>
                            <Box height='40%' border='1px solid red'></Box>
                            <Box flex={1} border='1px solid red'></Box>
                        </Box>
                        <Box border='1px solid red' width='25%' height='70%'>
                            <ButtonNavigate showBackButton = {false}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}