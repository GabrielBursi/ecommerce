import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { Filter, ProductList } from "../components";

export function ListProductsPage() {

    const { isLogged } = useContext(LoginContext)

    const { product } = useParams<'product'>()

    return (
        <LayoutBase showResearchInput showUserInfo showTabBar showBanner showActions = {isLogged}>
            <Box display='flex' justifyContent='center' alignItems='center' height='auto'>
                <Box width='75%' height='100%' display='flex' flexDirection='column' gap={2}>
                    <Filter product={product}/>
                    <Divider/>
                    <ProductList filter={5}/>
                </Box>
            </Box>
        </LayoutBase>
    );
}