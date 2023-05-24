import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { LayoutBase } from "../layouts";
import { IProducts } from "../types";
import { LoginContext, ProductsContext } from "../contexts";
import { ProductSelected } from "../components";

export function ProductPage() {

    const { uuid } = useParams<'uuid'>()

    const { getProductById } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    const [productSelectedInfo, setProductSelectedInfo] = useState<IProducts>();

    useEffect(() => {
        if(!uuid){
            return console.log('teste');
        }

        (async () => await getProductById(uuid, setProductSelectedInfo))()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid]);


    return (
        <LayoutBase showActions={isLogged} showResearchInput showTabBar showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <ProductSelected 
                    alt={productSelectedInfo?.name || '' } 
                    src={productSelectedInfo?.img || ''}
                    uuid={uuid || 'não existe'} 
                    img={productSelectedInfo?.img || '' } 
                    price={productSelectedInfo?.price || 0} 
                    rating={productSelectedInfo?.rating || 0} 
                    name={productSelectedInfo?.name || '' } 
                    category={productSelectedInfo?.category || 'home'}
                />
            </Box>
        </LayoutBase>
    );
}
