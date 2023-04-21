import { useContext, useEffect, useState } from "react";
import { Avatar, Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts";
import { ModalAction } from "../Modal";

export function UserInfo (){

    const { isLogged, formLogin, logOut } = useContext(LoginContext)

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        userIsLogged()
    }, []);

    async function userIsLogged(){
        const accessToken = localStorage.getItem('accessToken')

        if (!accessToken) {
            return false
        }


    }

    if (!isLogged) 
    return (
        <Box width='auto' height='50%' display='flex' alignItems='center' gap={1}>
            <Avatar sx={{ bgcolor: deepPurple[700], cursor: 'pointer' }} onClick={() => { navigate('/login') }} />
            {!mdDown && 
                <Box flex={1} height="100%" display="flex" flexDirection="column" alignItems='start' justifyContent='center'>
                    <Typography
                        variant="body2"
                        noWrap
                    >
                        Seja Bem-vindo(a)
                    </Typography>
                    <Box display='flex' width='auto' height='30%' gap={1} alignItems='center'>
                        <Typography
                            variant="caption"
                            noWrap
                            fontWeight='bold'
                            sx={{ cursor: 'pointer' }}
                            onClick = {() => navigate('/login')}
                        >
                            LOGIN
                        </Typography>
                        <Divider orientation="vertical" variant="middle" />
                        <Typography
                            variant="caption"
                            noWrap
                            fontWeight='bold'
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate('/login/create')}
                        >
                            CRIAR CONTA
                        </Typography>
                    </Box>
                </Box>
            }
        </Box>
    )

    return (
        <Box width='auto' height='50%' display='flex' alignItems='center' gap={1}>
            <Avatar sx={{ bgcolor: deepPurple[700] }}>{formLogin?.name[0].toLocaleUpperCase()}</Avatar>
            {!mdDown &&

                <Box flex={1} height="100%" display="flex" flexDirection="column" alignItems='start' justifyContent='center'>
                    <Typography
                        variant="body2"
                        fontWeight='bold'
                        noWrap
                    >
                        Olá {formLogin?.name},
                    </Typography>
                    <Box display='flex' width='auto' height='30%' gap={1} alignItems='center'>
                        <Typography
                            variant="caption"
                            noWrap
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate('/my-requests')}
                        >
                            
                            MEUS PEDIDOS
                        </Typography>
                        <Divider orientation="vertical" variant="middle" />
                        <Typography
                            variant="caption"
                            noWrap
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setIsOpen(true)}
                        >
                            SAIR
                        </Typography>
                    </Box>
                </Box>
            }
            <ModalAction
                action={logOut}
                isOpen={isOpen}
                question="Tem certeza que deseja sair da conta?"
                title="SAIR DA CONTA"
                setIsOpen={setIsOpen}
            />
        </Box>
    );
}