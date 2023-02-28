import { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { LayoutBase } from "../layouts";
import { IProducts } from "../types";
import { ProductsContext } from "../contexts";

export function ProductPage() {

    const { id } = useParams<'id'>()

    const [productInfo, setProductInfo] = useState<IProducts[]>();

    const { products } = useContext(ProductsContext)

    useEffect(() => {
        const productSelected = products.filter(product => product.id === id)
        setProductInfo(productSelected)
    }, [id]);

    return (
        <LayoutBase showActions showResearchInput showTabBar showUserInfo>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    height: '100%'
                }}
            >
                <Box //! box geral
                    sx={{
                        width: '1570px',
                        height: '750px',
                        border: '1px solid black',
                        display:'flex',
                        flexDirection:'column',
                    }}
                >
                    <Box //! box do titulo
                        sx={{
                            border: '1px solid black',
                            width:'100%',
                            height:'20%'
                        }}
                    >
                        <Typography 
                            variant="h4" 
                            color="black" 
                            fontWeight="bold" 
                            sx={{ wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }} 
                            overflow='hidden'
                            textOverflow='ellipsis'
                        >
                            {productInfo?.[0]?.title}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flex:1,
                            width:'100%',
                            border: '1px solid red',
                            display:'flex'
                        }}
                    > 
                        <Box //! box geral da esquerda
                            sx={{
                                border: '1px solid blue',
                                width:'50%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box //! box da imagem
                                sx={{
                                    flex: 1,
                                    width: '100%',
                                    border: '1px solid purple',
                                    display:'flex',
                                    flexDirection:'column'
                                }}
                            >
                                <Box //! box rating da imagem
                                    sx={{
                                        width: '100%',
                                        border: '1px solid green',
                                        height:'10%',
                                    }}
                                >

                                </Box>
                                <Box //! box da imagem e miniatura
                                    sx={{
                                        flex:1,
                                        width: '100%',
                                        border: '1px solid pink',
                                        display:'flex'
                                    }}
                                >
                                    <Box //!imagens miniaturas
                                        sx={{
                                            width: '10%',
                                            border: '1px solid blue',
                                        }}
                                    >

                                    </Box>
                                    <Box //!imagem em si
                                        sx={{
                                            flex:1,
                                            border: '1px solid red',
                                        }}
                                    >

                                    </Box>
                                </Box>
                            </Box>
                            <Box //! box do input cep
                                sx={{
                                    width: '100%',
                                    height: '25%',
                                    border: '1px solid yellow'
                                }}
                            >

                            </Box>
                        </Box>
                        <Box //! box geral da esquerda
                            sx={{
                                border: '1px solid blue',
                                flex:1,
                                display:'flex',
                                flexDirection:'column',
                            }}
                        >
                            <Box //! box do preço e infos
                                sx={{
                                    flex:1,
                                    width:'100%',
                                    border:'3px solid purple'
                                }}
                            >
                            </Box>
                            <Box //! box do carousel 
                                sx={{
                                    width: '100%',
                                    height:'25%',
                                    border: '1px solid yellow'
                                }}
                            >

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}
