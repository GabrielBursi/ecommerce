import { useContext } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { Badge, BadgeProps, Box, Icon, Paper, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { DrawerContext, LoginContext, ProductsContext, HeaderContext } from "../contexts";
import { Actions, TabBar, ResearchInput, UserInfo, Banner } from "../components";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -1,
        top: 5,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

interface LayoutProps {
    children: React.ReactNode,
    showResearchInput?: boolean,
    showActions?: boolean,
    showUserInfo? : boolean,
    showTabBar?: boolean,
    showBanner?: boolean,
}

export function LayoutBase({ children, showResearchInput = false, showActions = false, showUserInfo = false, showTabBar = true, showBanner = false}: LayoutProps) {

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const navigate = useNavigate()
    const match = useMatch('/');
    const { product } = useParams<'product'>()
    const productUpperCase = `${product?.charAt(0)?.toUpperCase()}${product?.slice(1)}`.replaceAll('_', ' ')

    const { isLogged } = useContext(LoginContext)
    const { toggleDrawer } = useContext(DrawerContext)
    const { productsTabBar } = useContext(HeaderContext)
    const { productsInCart } = useContext(ProductsContext)

    return (
        <Box height="100%" display="flex" flexDirection="column">
            <Box 
                component={Paper} 
                elevation={0} 
                square  
                padding={2} 
                height={theme.spacing(smDown ? 10 : mdDown ? 12 : 14)} 
                display="flex"
                alignItems="center" 
                justifyContent="space-evenly" 
                gap={2}
                sx={{ borderBottom: showTabBar ? '' : '2px solid #512da8'}}    
            >

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
                                <StyledBadge badgeContent={productsInCart.length} color="info">
                                    <ShoppingCartIcon color="primary" sx={{ cursor: "pointer" }} onClick={() => navigate('/cart')}/> 
                                </StyledBadge>
                                <Icon onClick={toggleDrawer}>menu</Icon>
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

            {showTabBar && <TabBar productsTabBar={productsTabBar}/>}

            <Box flex={1} overflow="auto">    
                {showBanner && <Banner title={match?.pathname === '/' ? 'Home' : productUpperCase } showCarousel={match?.pathname === '/'}/>}
                {children}
            </Box>
        </Box>
    );
}
