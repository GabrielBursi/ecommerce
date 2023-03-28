import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { Filter, ProductList } from "../components";

export function ListProductsPage() {

    const { isLogged } = useContext(LoginContext)

    const [filterPage, setFilterPage] = useState('20 por página');
    const [numberFilterPage, setNumberFilterPage] = useState(Number(filterPage.split(' ')[0]));

    const { product } = useParams<'product'>()

    return (
        <LayoutBase showResearchInput showUserInfo showTabBar showBanner showActions = {isLogged}>
            <Box display='flex' justifyContent='center' alignItems='center' height='auto'>
                <Box width='90%' height='100%' display='flex' flexDirection='column' gap={2}>
                    <Filter 
                        product={product} 
                        filterPage={filterPage} 
                        setFilterPage={setFilterPage} 
                        setNumberFilterPage={setNumberFilterPage}
                    />
                    <Divider/>
                    <ProductList filter={numberFilterPage as 20 | 40 | 60 | 80 | 100}/>
                </Box>
            </Box>
        </LayoutBase>
    );
}