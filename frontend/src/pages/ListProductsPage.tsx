import { useContext } from "react";
import { Box, Divider } from "@mui/material";
import { Filter, ProductList } from "../components";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { useParams } from "react-router-dom";

export function ListProductsPage() {

    const { isLogged } = useContext(LoginContext)

    const { product } = useParams<'product'>()

    return (
        <LayoutBase showResearchInput showUserInfo showTabBar showBanner showActions = {isLogged}>
            <Box display='flex' justifyContent='center' alignItems='center' height='auto'>
                <Box width='90%' height='100%' display='flex' flexDirection='column' gap={2}>
                    <Filter product={product}/>
                    <Divider/>
                    <ProductList filter={5}/>
                </Box>
            </Box>
        </LayoutBase>
    );
}