import { Avatar, Box, InputAdornment, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
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
            <Box component={Paper} elevation={0} square  padding={1} height={theme.spacing(smDown ? 10 : mdDown ? 12 : 14)} display="flex" alignItems="center" justifyContent="space-between" gap={2}>

                <Box width='20%' height='50%' display='flex' alignItems='center'>
                    <Typography
                        variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                        component="h1"
                        whiteSpace="nowrap"
                        overflow="ellipses"
                        color="primary"
                    >
                        R-eact Store
                    </Typography>
                </Box>
                
                <Box width='40%' height='50%'  display='flex' alignItems='center'>
                    <TextField
                        id="standard-search"
                        label="Pesquise o produto aqui"
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

                <Box width='30%' height='50%' display='flex' alignItems='center'>
                    <Box width='auto' height='100%' display='flex' alignItems='center' gap={1} mr={4}>
                        {/* //! mudar cor dinamicamente */}
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>G</Avatar>  
                        <Box flex={1} height="100%" display="flex" flexDirection="column" alignItems='start' justifyContent='center'>
                            <Typography
                                variant="body2"
                                noWrap
                            >
                                Olá Nome,
                            </Typography>
                            <Typography
                                variant="caption"
                                noWrap
                            >
                                MINHA CONTA | SAIR
                            </Typography>
                        </Box>
                    </Box>
                    <Box flex={1} height='100%' pl={1} display='flex' alignItems='center' justifyContent="center" gap={2} >
                        <ShoppingCartIcon color="primary"/>
                        <FavoriteIcon color="primary"/>
                        <InfoIcon color="primary"/>
                    </Box>
                </Box>

            </Box>    


            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    );
}
