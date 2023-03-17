import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { LayoutBase } from "../layouts";
import { IProducts } from "../types";
import { LoginContext, ProductsContext } from "../contexts";
import { ProductSelected } from "../components";

export function ProductPage() {

    const { id } = useParams<'id'>()

    const { products } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    const [productSelectedInfo, setProductSelectedInfo] = useState<IProducts>();

    useEffect(() => {
        if(!id){
            return console.log('teste');
        }
        const arrProductSelected = products.filter(product => product.id === id)
        const [productSelected] = arrProductSelected
        setProductSelectedInfo(productSelected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (
        <LayoutBase showActions={isLogged} showResearchInput showTabBar showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <ProductSelected 
                    alt={productSelectedInfo?.name || '' } 
                    src={productSelectedInfo?.img || ''}
                    id={id || 'não existe'} 
                    img={productSelectedInfo?.img || '' } 
                    price={productSelectedInfo?.price || 0} 
                    rating={productSelectedInfo?.rating || 0} 
                    name={productSelectedInfo?.name || '' } 
                />
            </Box>
        </LayoutBase>
    );
}
