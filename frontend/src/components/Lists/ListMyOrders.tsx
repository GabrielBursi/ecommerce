import { useContext, useState } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AddressContext, ResumeContext } from "../../contexts";
import { MyOrdersData } from "../../types";
import { MyOrdersList } from "../Products";

export const ListMyOrders = ({ date, number, payment, status, products }: MyOrdersData) => {

    const [showDetails, setShowDetails] = useState(false);

    const { formData } = useContext(AddressContext)
    const { frete, someProducts, total } = useContext(ResumeContext)

    return (
        <Box component={Paper} display='flex' alignItems='center' flexDirection='column' width='100%' height='auto' padding={4} gap={2} elevation={2}>
            <Box display='flex' alignItems='center' width='100%' height='100%'>
                <Box width='18%' height='100%' display='flex' alignItems='start' justifyContent='center' flexDirection='column' gap={3}>
                    <Typography variant="h6" fontWeight='bold'>
                        NÚMERO DO PEDIDO
                    </Typography>
                    <Typography variant="subtitle1">
                        {number}
                    </Typography>
                </Box>
                <Box width='18%' height='100%' display='flex' alignItems='start' justifyContent='center' flexDirection='column' gap={3}>
                    <Typography variant="h6" fontWeight='bold'>
                        STATUS
                    </Typography>
                    <Typography variant="subtitle1" color={status ? 'green' : 'error'} fontWeight='bold'>
                        {status ? 'Concluído' : 'Cancelado'}
                    </Typography>
                </Box>
                <Box width='18%' height='100%' display='flex' alignItems='start' justifyContent='center' flexDirection='column' gap={3}>
                    <Typography variant="h6" fontWeight='bold'>
                        DATA
                    </Typography>
                    <Typography variant="subtitle1">
                        {date}
                    </Typography>
                </Box>
                <Box width='18%' height='100%' display='flex' alignItems='start' justifyContent='center' flexDirection='column' gap={3}>
                    <Typography variant="h6" fontWeight='bold'>
                        PAGAMENTO
                    </Typography>
                    <Typography variant="subtitle1" color='primary' fontWeight='bold'>
                        {payment}
                    </Typography>
                </Box>
                <Box flex={1} height='auto' display='flex' alignItems='center' justifyContent='center'>
                    <Box display='flex' alignItems='center' sx={{cursor: 'pointer'}} onClick={() => setShowDetails(!showDetails)}>
                        <Typography color='primary' fontWeight='bold' variant='h5'>
                            Detalhes do pedido
                        </Typography>
                        {showDetails ? <KeyboardArrowUpIcon color="primary" fontSize="large" /> : <KeyboardArrowDownIcon color="primary" fontSize="large"/>}
                    </Box>
                </Box>
            </Box>
            { showDetails && 
                <>
                <Divider flexItem/>
                <Box flex={1}  width='100%' display='flex' flexDirection='column' gap={2}>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant="subtitle1" fontWeight='bold'>
                            ENDEREÇO
                        </Typography>
                        <Typography variant="body1">
                            {formData?.street}, Nº {formData?.number} - {formData?.complement},
                        </Typography>
                        <Typography variant="body1">
                            {formData?.neighborhood}, CEP {formData?.cep} - {formData?.city}, {formData?.state}
                        </Typography>
                    </Box>
                    <Divider flexItem/>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant="subtitle1" fontWeight='bold'>
                            PRODUTO(S)
                        </Typography>
                        {products.map(product => 
                            <MyOrdersList
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                img={product.img}
                                price={product.price}
                                quant={product.quant}
                            />
                        )}
                    </Box>
                    <Divider flexItem/>
                    <Box display='flex' flexDirection='column'>
                        <Box width='100%' padding={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography variant="subtitle1" fontWeight='bold'>
                                TOTAL PRODUTO(S)
                            </Typography>
                            <Typography variant="subtitle1" fontWeight='bold' color='primary'>
                                {someProducts.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Typography>
                        </Box>
                        <Box width='100%' padding={2} display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography variant="subtitle1" fontWeight='bold'>
                                FRETE
                            </Typography>
                            <Typography variant="subtitle1" fontWeight='bold' color='primary'>
                                {frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Typography>
                        </Box>
                        <Box width='100%' padding={2} bgcolor='#fafafb' display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography variant="subtitle1" fontWeight='bold'>
                                TOTAL DO PEDIDO
                            </Typography>
                            <Typography variant="subtitle1" fontWeight='bold' color='primary'>
                                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                </>
            }
        </Box>
    )
}
