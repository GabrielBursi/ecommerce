import { Box, Typography } from "@mui/material"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { LayoutBase } from "../layouts"
import { ListMyOrders } from "../components";

export const MyOrders = () => {

    const date = new Date(Date.now()).toLocaleString().split(',')[0];

    return (
        <LayoutBase showActions showResearchInput showTabBar showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='auto'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' paddingY={2} gap={2}>
                    <Box height="10%" display='flex' alignItems='center'>
                        <Typography variant="h2" color='primary'>
                            <ShoppingBasketIcon fontSize="large"/> MEUS PEDIDOS
                        </Typography>
                    </Box>
                    <Box flex={1} display='flex' flexDirection='column' gap={2}>
                        <ListMyOrders date={date} number='#33378187' payment={"pix".toUpperCase()} status={true}/>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    )
}
