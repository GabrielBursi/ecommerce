import { useContext } from "react";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import ViewListIcon from '@mui/icons-material/ViewList';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { LoginContext, ProductsContext, ThemeContext } from "../contexts";
import {LayoutBase} from "../layouts";
import { Carousel, DepartmentCard, MiniCardProduct, ProductCard } from "../components";

export function HomePage() {

    const { toggleTheme } = useContext(ThemeContext)
    const { isLogged, setIsLogged } = useContext(LoginContext)
    const { productsDepartments, products } = useContext(ProductsContext)

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <LayoutBase showResearchInput showUserInfo showBanner showTabBar showActions = {isLogged}>
            <Button variant="contained" color="primary" onClick={toggleTheme}>Mudar tema</Button>
            <Button variant="contained" color="primary" onClick={() => setIsLogged(!isLogged)}>{isLogged ? 'Logout' : 'Login'}</Button>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='auto'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' gap={2}>
                    <Box>
                        <Box display='flex' alignItems='center' gap={2} ml={2}>
                            <AutoAwesomeIcon color="primary" sx={{ fontSize: '2.2rem' }} />
                            <Typography color='primary' variant='h4' noWrap >
                                EM DESTAQUE
                            </Typography>
                        </Box>
                        <Carousel />
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        <Box display='flex' alignItems='center' gap={2} ml={2}>
                            <ViewListIcon color="primary" sx={{ fontSize: '2.2rem' }} />
                            <Typography color='primary' variant='h4' noWrap >
                                DEPARTAMENTOS
                            </Typography>
                        </Box>
                        <Box m={2}>
                            <Grid container columnSpacing={10} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {productsDepartments.map((product) => (
                                    <Grid item xs={3} key={product.name}>
                                        <DepartmentCard name={product.name} src={product.src} to={product.to}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                id={product.id}  
                                img={product.img}
                                price={product.price}
                                name={product.name}
                                rating={product.rating}
                                mdDown={mdDown}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}
