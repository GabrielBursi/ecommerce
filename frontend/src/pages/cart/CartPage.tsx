import { Box } from "@mui/material";
import { Steps, Resume, ListProductsInCart, Address } from "../../components";
import { LayoutBase } from "../../layouts";

export function CartPage() {

    return (
        <LayoutBase showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='auto'>
                <Box display='flex' flexDirection='column' width='75%' height='auto' alignItems='center' paddingY={2} gap={2}>
                    <Steps/>
                    <Box width='100%' height='100%' display='flex' gap={4}>
                        <Box flex={1} display='flex' flexDirection='column' gap={4}>
                            <Address/>
                            <ListProductsInCart/>
                        </Box>
                        <Resume/>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}