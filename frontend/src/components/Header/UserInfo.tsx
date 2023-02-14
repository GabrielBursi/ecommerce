import { Avatar, Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export function UserInfo (){

    const isLogged = false

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const navigate = useNavigate()

    if (!isLogged) 
    return (
        <Box width='auto' height='50%' display='flex' alignItems='center' gap={1}>
            {/* //! mudar cor dinamicamente */}
            <Avatar sx={{ bgcolor: deepPurple[700] }}/>
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
            <Avatar sx={{ bgcolor: deepPurple[700] }} >G</Avatar>
            {!mdDown &&

                <Box flex={1} height="100%" display="flex" flexDirection="column" alignItems='start' justifyContent='center'>
                    <Typography
                        variant="body2"
                        fontWeight='bold'
                        noWrap
                    >
                        Olá Nome,
                    </Typography>
                    <Box display='flex' width='auto' height='30%' gap={1} alignItems='center'>
                        <Typography
                            variant="caption"
                            noWrap
                            sx={{ cursor: 'pointer' }}
                        >
                            MINHA CONTA
                        </Typography>
                        <Divider orientation="vertical" variant="middle" />
                        <Typography
                            variant="caption"
                            noWrap
                            sx={{ cursor: 'pointer' }}
                        >
                            SAIR
                        </Typography>
                    </Box>
                </Box>
            }
        </Box>
    );
}