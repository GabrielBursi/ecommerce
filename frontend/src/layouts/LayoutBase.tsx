import { Avatar, Box, Divider, Icon, InputAdornment, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deepOrange } from "@mui/material/colors";


interface LayoutProps {
    children: React.ReactNode,
    title: string
}

export function LayoutBase({ children, title }: LayoutProps) {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))


    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box component={Paper} elevation={0} square  padding={2} height={theme.spacing(smDown ? 10 : mdDown ? 12 : 14)} display="flex" alignItems="center" justifyContent="space-evenly" gap={2}>

                <Box width='auto' height='50%' display='flex' alignItems='center'>
                    {smDown ? 
                        <Icon color="primary">fitbit</Icon>
                        :
                        <Typography
                            variant={mdDown ? 'h5' : 'h4'}
                            component="h1"
                            whiteSpace="nowrap"
                            overflow="ellipses"
                            color="primary"
                            noWrap
                            sx={{cursor:'pointer'}}
                        >
                            <Icon color="primary">fitbit</Icon> R-commerce
                        </Typography>
                    }
                </Box>
                
                <Box width='50%' height='50%'  display='flex' alignItems='center'>
                    <TextField
                        id="standard-search"
                        label="Pesquise aqui"
                        variant="standard"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="primary"/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {smDown ? 
                    <Box width='auto' height='50%' display='flex' alignItems='center' justifyContent="center" gap={2}>
                        <ShoppingCartIcon color="primary" sx={{ cursor: "pointer" }} />
                        <Icon>menu</Icon>
                    </Box>
                    : 
                    <>
                        <Box width='auto' height='50%' display='flex' alignItems='center' gap={1}>
                            {/* //! mudar cor dinamicamente */}
                            <Avatar sx={{ bgcolor: deepOrange[500]}} >G</Avatar>
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
                                            sx={{cursor: 'pointer'}}
                                        >
                                            MINHA CONTA
                                        </Typography>
                                        <Divider orientation="vertical" variant="middle"  />
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
                        <Box width='auto' height='50%' display='flex' alignItems='center' justifyContent="center" gap={3} >
                            <FavoriteIcon color="primary" sx={{cursor: "pointer"}}/>
                            <ShoppingCartIcon color="primary" sx={{cursor: "pointer"}}/>
                        </Box>
                    </>
                }
                

            </Box>    


            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    );
}
