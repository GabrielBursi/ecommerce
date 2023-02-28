import { useContext, useEffect, useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Rating, TextField, Typography } from "@mui/material";
import SellIcon from '@mui/icons-material/Sell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useParams } from "react-router-dom";
import { LayoutBase } from "../layouts";
import { IProducts } from "../types";
import { ProductsContext } from "../contexts";
import { Carousel, MyImage } from "../components";

export function ProductPage() {

    const { id } = useParams<'id'>()

    const [productInfo, setProductInfo] = useState<IProducts[]>();

    const { products } = useContext(ProductsContext)

    useEffect(() => {
        const productSelected = products.filter(product => product.id === id)
        setProductInfo(productSelected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    component={Paper}
                    elevation={2}
                    sx={{
                        width: '1570px',
                        height: '750px',
                        display:'flex',
                        flexDirection:'column',
                        padding:2
                    }}
                >
                    <Box //! box do titulo
                        sx={{
                            width:'100%',
                            height:'20%'
                        }}
                    >
                        <Typography 
                            variant="h5" 
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
                            display:'flex'
                        }}
                    > 
                        <Box //! box geral da esquerda
                            sx={{
                                width:'50%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box //! box da imagem
                                sx={{
                                    flex: 1,
                                    width: '100%',
                                    display:'flex',
                                    flexDirection:'column'
                                }}
                            >
                                <Box //! box rating da imagem
                                    sx={{
                                        width: '100%',
                                        height:'10%',
                                        display: 'flex',
                                        justifyContent:'space-between',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '30%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="subtitle1" color='black' fontWeight='bold'>
                                            {productInfo?.[0]?.title.split(' ')[0]}
                                        </Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem/>
                                    <Box
                                        sx={{
                                            width:'30%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Rating value={productInfo?.[0]?.rating || 4} precision={0.5} readOnly max={5} size='large' />
                                    </Box>
                                    <Divider orientation="vertical" flexItem/>
                                    <Box
                                        sx={{
                                            width:'30%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap:2
                                        }}
                                    >
                                        <IconButton color='primary' size="medium">
                                            <ShareIcon sx={{fontSize:'2rem'}}/>
                                        </IconButton>
                                        <IconButton color='primary' size="medium">
                                            <FavoriteIcon sx={{fontSize:'2rem'}}/>
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Box //! box da imagem e miniatura
                                    sx={{
                                        flex:1,
                                        width: '100%',
                                        display:'flex'
                                    }}
                                >
                                    <Box //!imagens miniaturas
                                        sx={{
                                            width: '10%',
                                        }}
                                    >
                                        
                                    </Box>
                                    <Box //!imagem em si
                                        sx={{
                                            flex:1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <MyImage alt={productInfo?.[0]?.title || 'teste'} src={productInfo?.[0]?.img || 'teste'} width='290px' />
                                    </Box>
                                </Box>
                            </Box>
                            <Box //! box do input cep
                                sx={{
                                    width: '100%',
                                    height: '25%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'start',
                                    flexDirection:'column',
                                    gap:1
                                }}
                            >
                                <Typography variant="subtitle1" color='black' fontWeight='bold'>
                                    Consultar frete e prazo de entrega
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap:1,
                                        height:'40%'
                                    }}
                                >
                                    <TextField placeholder="Inserir CEP"/>
                                    <Button variant="outlined" size="large" sx={{fontSize: '1.2rem', fontWeight:'bold'}}>
                                        OK
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box //! box geral da esquerda
                            sx={{
                                flex:1,
                                display:'flex',
                                flexDirection:'column',
                            }}
                        >
                            <Box //! box do preço e infos
                                sx={{
                                    flex:1,
                                    width:'100%',
                                    display:'flex',
                                    flexDirection:'column'
                                }}
                            >
                                <Box //! preço e botao
                                    sx={{
                                        flex:1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height:'60%',
                                            display:'flex',
                                        }}
                                    >
                                        <Box //!preço
                                            sx={{
                                                flex:1,
                                            }}
                                        >

                                        </Box>
                                        <Box //! botão
                                            sx={{
                                                width: '40%',
                                            }}
                                        >

                                        </Box>
                                    </Box>
                                </Box>
                                <Box //! Produtos similares
                                    sx={{
                                        height:'20%',
                                        display: 'flex',
                                        alignItems:'end'

                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center',
                                            width:'auto',
                                            gap:1

                                        }}
                                    >
                                        <SellIcon color="primary" sx={{fontSize: '1rem'}}/>
                                        <Typography variant="h6" color='black' fontWeight='bold' noWrap>
                                            PRODUTOS SIMILARES
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box //! box do carousel 
                                sx={{
                                    width: '100%',
                                    height:'25%',
                                }}
                            >
                                {/* <Carousel showMiniCard/> */}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}
