import { useContext } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { info, InfoUser } from "./InfoUser";
import { AddressContext, LoginContext } from "../../../contexts";

export function InfoRequest(){

    const { addressData } = useContext(AddressContext)
    const { loginInfo } = useContext(LoginContext)

    const dataUser: info[] = [
        { nome: 'CPF', dados: loginInfo?.cpf },
        { nome: 'E-mail', dados: loginInfo?.email },
        { nome: 'CEP', dados: addressData?.cep },
    ]

    const dataAddress: info[] = [
        { nome: 'Número', dados: addressData?.number },
        { nome: 'Bairro', dados: addressData?.neighborhood },
        { nome: 'CEP', dados: addressData?.cep },
        { nome: 'Cidade', dados: addressData?.city },
        { nome: 'Complemento', dados: addressData?.complement },
    ]

    return (
        <Box height='auto' component={Paper} elevation={2} padding={2} display='flex' flexDirection='column' gap={2}>
            <Box display='flex' alignItems='center' gap={1} height='auto'>
                <LocalShippingIcon color="primary" />
                <Typography variant="h5" fontWeight='bold'>
                    RESUMO
                </Typography>
            </Box>
            <Box height='30%' width='100%' display='flex'>
                <Box width='50%' height='100%'>
                    <Typography variant="h6" fontWeight='bold'>
                        Dados pessoais
                    </Typography>
                    <Typography variant="body1" fontWeight='light'>
                        Informações que serão inseridas na nota fiscal do pedido.
                    </Typography>
                </Box>
                <Box width='50%' height='100%'>
                    <Typography variant="h6" fontWeight='bold'>
                        Endereço de entrega
                    </Typography>
                    <Typography variant="body1" fontWeight='light'>
                        Este é o endereço onde seu pedido será enviado.
                    </Typography>
                </Box>
            </Box>
            <Divider/>
            <Box display='flex' gap={1} height='100%'>
                <InfoUser principalInfo={loginInfo?.name} infos={dataUser}/>
                <InfoUser principalInfo={addressData?.street} infos={dataAddress} />
            </Box>
        </Box>
    );
}
