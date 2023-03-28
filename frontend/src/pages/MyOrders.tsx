import { useContext } from "react";
import { Box, Typography } from "@mui/material"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { LayoutBase } from "../layouts"
import { EmptyMessage, ListMyOrders } from "../components";
import { ProductsContext } from "../contexts";

export const MyOrders = () => {

    const { myOrders } = useContext(ProductsContext)

    return (
        <LayoutBase showActions showResearchInput showTabBar showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='auto'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' paddingY={2} gap={2}>
                    {myOrders.length > 0 ? 
                        <>
                            <Box height="10%" display='flex' alignItems='center'>
                                <Typography variant="h2" color='primary'>
                                    <ShoppingBasketIcon fontSize="large"/> MEUS PEDIDOS
                                </Typography>
                            </Box>
                            <Box flex={1} display='flex' flexDirection='column' gap={2}>
                                {myOrders.map(order => 
                                    <ListMyOrders 
                                        key={order.number}
                                        date={order.date} 
                                        number={order.number}
                                        payment={order.payment} 
                                        status={order.status}
                                        products={order.products}
                                    />
                                )}
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
