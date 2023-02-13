import { Box, Icon, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Actions, ListProducts, ResearchInput, UserInfo } from "../components";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode,
    showResearchInput?: boolean,
    showActions?: boolean,
    showUserInfo? : boolean,
    showTabBar?: boolean,
}

export function LayoutBase({ children, showResearchInput = false, showActions = false, showUserInfo = false, showTabBar = true}: LayoutProps) {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const navigate = useNavigate()

    const isLogged = false

    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Box component={Paper} elevation={0} square  padding={2} height={theme.spacing(smDown ? 10 : mdDown ? 12 : 14)} display="flex" alignItems="center" justifyContent="space-evenly" gap={2}>

                <Box width='auto' height='50%' display='flex' alignItems='center'>
                    {smDown ? 
                        <Icon color="primary" onClick={() => navigate('/')}>fitbit</Icon>
                        :
                        <Typography
                            variant={mdDown ? 'h5' : 'h4'}
                            component="h1"
                            whiteSpace="nowrap"
                            overflow="ellipses"
                            color="primary"
                            noWrap
                            sx={{cursor:'pointer'}}
                            onClick={() => navigate('/')}
                        >
                            <Icon color="primary">fitbit</Icon> R-commerce
                        </Typography>
                    }
                </Box>
                
                <Box width='50%' height='50%'  display='flex' alignItems='center'>
                    {showResearchInput && <ResearchInput/>}
                </Box>

                {smDown ? 
                    
                    <Box width='auto' height='50%' display='flex' alignItems='center' justifyContent="center" gap={2}>
                        {isLogged ? 
                            <>
                                <ShoppingCartIcon color="primary" sx={{ cursor: "pointer" }} /> 
                                <Icon>menu</Icon>
                            </>
                            : 
                            <UserInfo/>
                        }
                    </Box>
                    : 
                    <>
                        {showUserInfo && <UserInfo/>}
                        {showActions && <Actions/>}
                    </>
                }
                

            </Box>    

                {showTabBar && <ListProducts />}

            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    );
}
