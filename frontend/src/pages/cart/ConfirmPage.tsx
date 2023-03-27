import { Box } from "@mui/material";

import { InfoRequest, ListProductsInCart, Resume, Steps } from "../../components";
import { LayoutBase } from "../../layouts";

export function ConfirmPage() {

    return (
        <LayoutBase showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' alignItems='center' paddingY={2} gap={2}>
                    <Steps/>
                    <Box width='100%' height='100%' display='flex' gap={4}>
                        <Box flex={1} display='flex' flexDirection='column' gap={4}>
                            <InfoRequest/>
                            <ListProductsInCart showDetails/>
                        </Box>
                        <Resume showDetails/>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}