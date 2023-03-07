import { useContext } from "react";
import { Box, Divider } from "@mui/material";
import { Filter } from "../components";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { useParams } from "react-router-dom";

export function ListProductsPage() {

    const { isLogged } = useContext(LoginContext)

    const { product } = useParams<'product'>()

    return (
        <LayoutBase showResearchInput showUserInfo showTabBar showBanner showActions = {isLogged}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Box border='1px solid black' width='70%' height='100%' display='flex' flexDirection='column' gap={2}>
                    <Filter product={product}/>
                    <Divider/>
                    <Box></Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}