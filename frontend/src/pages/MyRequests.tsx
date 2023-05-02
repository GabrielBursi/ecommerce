import { useContext } from "react";
import { Box, Typography } from "@mui/material"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { LayoutBase } from "../layouts"
import { EmptyMessage, ListMyRequests } from "../components";
import { ShoppingContext } from "../contexts";

export const MyRequests = () => {

    const { userShop } = useContext(ShoppingContext)

    return (
        <LayoutBase showActions showResearchInput showTabBar showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='auto'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' paddingY={2} gap={2}>
                    { userShop && userShop.myOrders.length > 0 ? 
                        <>
                            <Box height="10%" display='flex' alignItems='center'>
                                <Typography variant="h2" color='primary'>
                                    <ShoppingBasketIcon fontSize="large"/> MEUS PEDIDOS
                                </Typography>
                            </Box>
                            <Box flex={1} display='flex' flexDirection='column' gap={2}>
                                {
                                    userShop?.myOrders.sort((a, b) => {
                                        let x = new Date(b.info.date).valueOf()
                                        let y = new Date(a.info.date).valueOf()
                                        return x - y
                                    }).map(order => 
                                        <ListMyRequests 
                                            key={order.info.number}
                                            info={order.info}
                                            products={order.products}
                                            address={order.address}
                                        />
                                    )
                                }
                            </Box>
                        </>
                        : 
                        <EmptyMessage alert="pedido"/>
                    }
                </Box>
            </Box>
        </LayoutBase>
    )
}
