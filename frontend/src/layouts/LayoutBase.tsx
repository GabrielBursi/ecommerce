import { Box, Icon, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Actions, ListProducts, ResearchInput, UserInfo } from "../components";

interface LayoutProps {
    children: React.ReactNode,
    title: string,
    showResearchInput?: boolean,
    showActions?: boolean,
    showUserInfo? : boolean,
}

export function LayoutBase({ children, title, showResearchInput = false, showActions = false, showUserInfo = false}: LayoutProps) {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const isLogged = false

    return (
        <Box height="100%" display="flex" flexDirection="column">
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
            
            <Box component={Paper} width="100%" height='4%' square elevation={4} bgcolor='#4527a0' >
                <ListProducts />
            </Box>

            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    );
}
